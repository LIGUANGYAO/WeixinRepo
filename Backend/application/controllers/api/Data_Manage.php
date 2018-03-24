<?php defined('BASEPATH') OR exit('No direct script access allowed');

require_once('./application/libraries/REST_Controller.php');

/**
 * User_Manage API controller
 *
 */
class Data_Manage extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('user_model');
        $this->load->model('booking_model');
        $this->load->model('event_model');
        $this->load->model('rating_model');
        $this->load->model('member_state_model');
        $this->load->model('rule_model');
        $this->load->model('boss_model');
        $this->load->model('accept_address_model');
    }

    /*
    * this function is used to add new user who entered into the fengti, 
        but only nickname and avatar
    */
    public function addNewUser()
    {
        $user['avatar'] = $this->image_upload();
        $user['nickname'] = $data->{"nickname"};
        $result = $this->user_model->addNewUser($user);
        if ($user['avatar']!=false) {
            echo json_encode(array('status' => true, 'result' => true), 200);
        } else {
            echo json_encode(array('status' => false, 'result' => "-1"), 200);
        }
    }

    /*
    * this function is used to get all of the information of the user by using nickname
    */
    public function getState()
    {
        $data = json_decode(file_get_contents("php://input"));
        $nickname = $data->{'nickname'};
        $result = $this->user_model->getState($nickname);
        if(count($result)>0){
            echo json_encode(array('status' => true, 'result' => $result), 200);
        } else {
            echo json_encode(array('status' => false, 'result' => "-1"), 200);
        }
        exit;
    }

    /*
    * this function is used to get all of the booking information 
    which the user want to see by the nickname of the user and the state of booking
    */
    public function getMyBooking()
    {
        $data = json_decode(file_get_contents("php://input"));
        $nickname = $data->{"nickname"};
        $bookingState = $data->{"bookingState"};
        $result = $this->booking_model->getBookingByUser($nickname, $bookingState);
        if(count($result)>0){
            echo json_encode(array('status' => true, 'result' => $result), 200);
        } else {
            echo json_encode(array('status' => false, 'result' => "-1"), 200);
        }
    }

    /*
    * this function is used to get detail of the booking information 
    which the user want to see by id of booking
    */
    public function getBookingDetail()
    {
        $data = json_decode(file_get_contents("php://input"));
        $bookingId = $data->{'booking_id'};
        $result = $this->booking_model->getBookingById($bookingId);
        if(count($result)>0){
            echo json_encode(array('status' => true, 'result' => $result), 200);
        } else {
            echo json_encode(array('status' => false, 'result' => "-1"), 200);
        }
    }

    /*
    * this function is used to check the state of all events 
        with the comparation of end_time and now 
        then change the state and also change the state of booking
        which is associated with those events
    */
    function checkEventState()
    {
        $endedEvents = $this->event_model->checkStateByTime();
        $this->booking_model->changeStateByEvent($endedEvents);
    }

    /*
    * this function is used to cancel the booking of the user
    */
    public function cancelBooking()
    {
        $data = json_decode(file_get_contents("php://input"));
        $booking_id = $data->{"booking_id"}; 
        $state['state'] = 3;
        $result = $this->booking_model->updateStateByBookingId($booking_id, $state);
        if($result){
            echo json_encode(array('status' => true), 200);
        } else {
            echo json_encode(array('status' => false), 200);
        }
    }

    /*
    * this function is used to add the rating to the site which its' event that the user entered is finished.
    */
    public function addRating()
    {
        $data = json_decode(file_get_contents("php://input"));
        $info['user_id'] = $data->{"user_id"};
        $event_id = $data->{"event_id"};
        $info['point'] = $data->{"point"};
        $info['comment'] = $data->{"comment"};
        $boss_id = $this->event_model->getOrganizerId($event_id);
        $info['boss_id'] = $boss_id[0]->organizer_id;
        $result = $this->rating_model->addRating($info);
        if($result){
            echo json_encode(array('status' => true, 'result' => $result), 200);
        } else {
            echo json_encode(array('status' => false, 'result' => "-1"), 200);
        }
    }

    /*
    * this function is used to get information of all events that user created
    */
    public function getEventByUser()
    {
        $data = json_decode(file_get_contents("php://input"));
        $user_id = $data->{"user_id"};
        $state = $data->{"state"};
        $result = $this->event_model->getEventByUser($user_id, $state);
        if(count($result)>0){
            echo json_encode(array('status' => true, 'result' => $result), 200);
        } else {
            echo json_encode(array('status' => false, 'result' => "-1"), 200);
        }
    }

    /*
    * this function is used to get detail information of events that user selected
    */
    public function getEventDetail()
    {
        $data = json_decode(file_get_contents("php://input"));
        $event_id = $data->{"event_id"};
        $result = $this->event_model->getEventDetailById($event_id);
        $booking = $this->booking_model->getBookingDetailByEvent($event_id);
        if(count($result)>0){
            echo json_encode(array('status' => true, 'result' => $result, 'booking' => $booking), 200);
        } else {
            echo json_encode(array('status' => false, 'result' => "-1"), 200);
        }
    }

    /*
    * this function is used to cancel the event which user created
    */
    public function cancelEvent()
    {
        $data = json_decode(file_get_contents("php://input"));
        $event_id = $data->{"event_id"}; 
        $state['state'] = 3;
        $result = $this->event_model->updateStateById($event_id, $state);
        if($result){
            echo json_encode(array('status' => true), 200);
        } else {
            echo json_encode(array('status' => false), 200);
        }
    }

    /*
    * this function is used to get the member status
    */
    public function getMemberState()
    {
        $data = json_decode(file_get_contents("php://input"));
        $user_id = $data->{"user_id"};
        $result = $this->member_state_model->getMemberState($user_id);
        if($result != null){
            echo json_encode(array('status' => true, 'result' => $result), 200);
        } else {
            echo json_encode(array('status' => false, 'result' => 0), 200);
        }
    }

    /*
    * this function is used to set the member state or continue member state
    */
    public function setMember()
    {
        $data = json_decode(file_get_contents("php://input"));
        $user_id = $data->{"user_id"};
        $cost = $data->{"cost"};
        $member_cost = $this->rule_model->getMemberCost();
        $result = $this->member_state_model->setMemberState($user_id, $cost, $member_cost[0]->value);
        if(count($result)>0){
            echo json_encode(array('status' => true), 200);
        } else {
            echo json_encode(array('status' => false, 'cost' => $cost, 'member' => $member_cost), 200);
        }
    }

    /*
    * this function is used to get the information of favourite site
    */
    public function getFavouriteSite()
    {
        $data = json_decode(file_get_contents("php://input"));
        $user_id = $data->{'user_id'};
        $result = $this->user_model->getFavouriteSite($user_id);
        if($result !=null){
            echo json_encode(array('status' => true, 'result' => $result), 200);
        } else {
            echo json_encode(array('status' => false), 200);
        }
    }

    /*
    * this function is used to get the information of the site
    */
    public function getSiteDetail()
    {
        $data = json_decode(file_get_contents("php://input"));
        $user_id = $data->{'user_id'};
        $boss_id = $data->{'boss_id'};
        $site = $this->boss_model->getSiteDetail($boss_id);
        $picture = $this->boss_model->getSitePictures($boss_id);
        $isFavourite = $this->boss_model->isFavourite($user_id, $boss_id);
        $event = $this->event_model->getEventByUser($boss_id, 1);
        if($site !=null){
            echo json_encode(array('status' => true, 'site' => $site, 'picture' => $picture, 'isFavourite' => $isFavourite, 'event' => $event), 200);
        } else {
            echo json_encode(array('status' => false), 200);
        }
    }

    /*
    * this function is used to get rating of the site
    */
    public function getRatingBySite()
    {
        $data = json_decode(file_get_contents("php://input"));
        $boss_id = $data->{'boss_id'};
        $result = $this->rating_model->getRatingByBoss($boss_id);
        if($result !=null){
            echo json_encode(array('status' => true, 'result' => $result), 200);
        } else {
            echo json_encode(array('status' => false), 200);
        }
    }

    /*
    * this function is used to register user
    */
    public function registerUser()
    {
        $data = json_decode(file_get_contents("php://input"));
        $imageUrl = $this->multiple_image_upload();
        $info['nickname'] = $data->{'nickname'};
        $info['role'] = $data->{'role'};
        $info['name'] = $data->{'name'};
        $boss['site_name'] = $data->{'site_name'};
        $boss['phone'] = $data->{'phone'};
        $boss['address1'] = $data->{'address1'};
        $boss['address2'] = $data->{'address2'};
        $boss['address3'] = $data->{'address3'};
        $boss['address4'] = $data->{'address4'};
        $boss['id_no'] = $data->{'id_no'};
        $boss['allow_pic'] = $imageUrl[0];
        $boss['id_pic1'] = $imageUrl[1];
        $boss['id_pic2'] = $imageUrl[2];
        $result = $this->user_model->registerUser($nickname, $info, $boss);
        if(count($result)>0){
            echo json_encode(array('status' => true), 200);
        } else {
            echo json_encode(array('status' => false), 200);
        }
    }

    /*
    * this function is used to get the address where current user can accept the goods
    */
    public function addAcceptAddress()
    {
        $data = json_decode(file_get_contents("php://input"));
        $result = $this->accept_address_model->addAddressByUser($data);
        if($result){
            echo json_encode(array('status' => true, 'result' => $result), 200);
        } else {
            echo json_encode(array('status' => false), 200);
        }
    }

    /*
    * this function is used to get the address where current user can accept the goods
    */
    public function getAcceptAddress()
    {
        $data = json_decode(file_get_contents("php://input"));
        $user_id = $data->{'user_id'};
        $result = $this->accept_address_model->getAddressByUser($user_id);
        if(count($result)>0){
            echo json_encode(array('status' => true, 'result' => $result), 200);
        } else {
            echo json_encode(array('status' => false), 200);
        }
    }

    /*
    * this function is used to change the address where current user can accept the goods
    */
    public function changeAcceptAddress()
    {
        $data = json_decode(file_get_contents("php://input"));
        $address_id = $data->{'address_id'};
        $info['user_id'] = $data->{'user_id'};
        $info['name'] = $data->{'name'};
        $info['address'] = $data->{'address'};
        $info['phone'] = $data->{'phone'};
        $info['email'] = $data->{'email'};
        $result = $this->accept_address_model->changeAddressById($address_id, $info);
        if($result){
            echo json_encode(array('status' => true), 200);
        } else {
            echo json_encode(array('status' => false), 200);
        }
    }

    /*
    * this function is used to mark the address as the actual address where current user can accept the goods
    */
    public function checkAcceptAddress()
    {
        $data = json_decode(file_get_contents("php://input"));
        $address_id = $data->{'address_id'};
        $user_id = $data->{'user_id'};
        $result = $this->accept_address_model->checkAddressById($address_id, $user_id);
        if(count($result)>0){
            echo json_encode(array('status' => true), 200);
        } else {
            echo json_encode(array('status' => false), 200);
        }
    }

    /*
    * this function is used to delete address where current user can accept the goods
    */
    public function deleteAcceptAddress()
    {
        $data = json_decode(file_get_contents("php://input"));
        $address_id = $data->{'address_id'};
        $result = $this->accept_address_model->deleteAddressById($address_id);
        if(count($result)>0){
            echo json_encode(array('status' => true), 200);
        } else {
            echo json_encode(array('status' => false), 200);
        }
    }

    /*
    * this function is used to get the status of site whether or not user input information
    */
    public function getSiteStatus()
    {
        $data = json_decode(file_get_contents("php://input"));
        $user_id = $data->{'user_id'};
        $result = $this->boss_model->getSiteStatus($user_id);
        if($result){
            echo json_encode(array('status' => true), 200);
        } else {
            echo json_encode(array('status' => false), 200);
        }
    }

    /*
    * this function is used to add the information of site which tells other users introduction and the service of the site
    */
    public function addSiteInfo()


    {
        $data = json_decode(file_get_contents("php://input"));

        $user_id = $data->{'user_id'};
        $imageUrl = $this->multiple_image_upload();
        $info['site_icon'] = $imageUrl[0];
        for($index = 1; $index<count($imageUrl); $index++){
            $picture[$index-1] = $imageUrl[$index];
        }

        $info['site_introduction'] = $data->{'introduction'};
        $info['site_service'] = $data->{'service'};
        $result1 = $this->boss_model->addSiteInfo($user_id, $info);
        $result2 = $this->boss_model->addSitePicture($user_id, $picture);
        if($result1 == true && $result2 == true){
            echo json_encode(array('status' => true), 200);
        } else {
            echo json_encode(array('status' => false), 200);
        }
    }

    /*
    * this function is used to edit the information of site which tells other users introduction and the service of the site
    */
    public function editSiteInfo()
    {
        $data = json_decode(file_get_contents("php://input"));
        $user_id = $data->{'user_id'};
        $imageUrl = $this->multiple_image_upload();
        $info['site_icon'] = $imageUrl[0];
        for($index = 1; $index<count($imageUrl); $index++){
            $picture[$index-1] = $imageUrl[$index];
        }
        $info['site_introduction'] = $data->{'introduction'};
        $info['site_service'] = $data->{'service'};
        $result1 = $this->boss_model->addSiteInfo($user_id, $info);
        $result2 = $this->boss_model->changeSitePicture($user_id, $picture);
        if($result1 == true && $result2 == true){
            echo json_encode(array('status' => true), 200);
        } else {
            echo json_encode(array('status' => false), 200);
        }
    }

    /*
    * this function is used to create the event
    */
    public function addEvent()
    {
        $data = json_decode(file_get_contents("php://input"));
        $event['organizer_id'] = $data->{'user_id'};
        $user_role = $data->{'role'};
        $event['name'] = $data->{'event_name'};
        $event['type'] = $data->{'event_type'};
        $event['start_time'] = $data->{'start_time'};
        $event['end_time'] = $data->{'end_time'};
        $event['address1'] = $data->{'address1'};
        $event['address2'] = $data->{'address2'};
        $event['address3'] = $data->{'address3'};
        $event['address4'] = $data->{'address4'};
        $event['limit'] = $data->{'limit'};
        $event['cost'] = $data->{'cost'};
        $event['comment'] = $data->{'comment'};
        $event['pic'] = $this->image_upload();
        if($user_role == 2)
        {
            $event['publicity'] = $data->{'publicity'};
            $event['additional'] = $data->{'additional'};
        }
        $result = $this->event_model->addEvent($user_role, $event);
        if(count($result)>0){
            echo json_encode(array('status' => true), 200);
        } else {
            echo json_encode(array('status' => false), 200);
        }
    }

    public function image_upload()
    {
        if(isset($_FILES['file']['name']))
        {
            $config['upload_path'] = './uploads/';
            $config['allowed_types'] = 'jpg|jpeg|png|gif';
            $this->load->library('upload', $config);
            if(!$this->upload->do_upload('file'))
            {
                return $this->upload->display_errors();
            }
            else
            {
                $data = $this->upload->data();
                return $data["file_name"];
            }
        }
    }

    public function multiple_image_upload()
    {

        $this->load->library('upload');

        $files = $_FILES;
        $count = count($_FILES['files']['name']);
        for($i=0; $i<$count; $i++)
        {           
            $_FILES['files']['name']= $files['files']['name'][$i];
            $_FILES['files']['type']= $files['files']['type'][$i];
            $_FILES['files']['tmp_name']= $files['files']['tmp_name'][$i];
            $_FILES['files']['error']= $files['files']['error'][$i];
            $_FILES['files']['size']= $files['files']['size'][$i];    

            $this->upload->initialize($this->set_upload_options());
            // $this->upload->do_upload('files[]');
            if (!$this->upload->do_upload('files[]'))
            {  
                $error =['error' => $this->upload->display_errors()];
            }
            else{
                $data = $this->upload->data();
                return $data["file_name"];
            }
        }
    }
    public function set_upload_options()
    {
        $config['upload_path'] = getcwd().'/uploads/';
        $config['allowed_types'] = 'gif|jpg|jpeg|png';
        $config['remove_spaces'] = true;
        return $config;
    }
}

/* End of file User_Manage.php */
/* Location: ./application/controllers/api/User_Manage.php */