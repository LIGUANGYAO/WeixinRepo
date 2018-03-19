<?php defined('BASEPATH') OR exit('No direct script access allowed');
header('Access-Control-Allow-Origin: *');

require_once('./application/libraries/REST_Controller.php');

/**
 * User_Manage API controller
 *
 */
class User_Manage extends REST_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('user_model');
        $this->load->model('booking_model');

    }

    /*
    * this function is used to add new user who entered into the fengti, 
        but only nickname and avatar
    */
    public function addNewUser()
    {
        $user['nickname'] = $this->input->post("nickname");
        $user['avatar'] = $this->input->post('avatar');
        $result = $this->user_model->addNewUser($user);
        if ($result==true) {
            $this->response(array('status' => true, 'result' => $result), 200);
        } else {
            $this->response(array('status' => false, 'result' => "-1"), 200);
        }
    }

    /*
    * this function is used to get all of the information of the user by using nickname
    */
    public function getState()
    {
        $nickname = $this->input->post("nickname");
        $result = $this->user_model->getUserState($nickname);
        if(count($result)>0){
            $this->response(array('status' => true, 'result' => $result), 200);
        } else {
            $this->response(array('status' => false, 'result' => "-1"), 200);
        }
    }

    /*
    * this function is used to get all of the booking information 
    which the user want to see by the nickname of the user and the state of booking
    */
    public function getMyBooking()
    {
        $nickname = $this->input->post("nickname");
        $bookingState = $this->input->post("bookingState");
        $result = $this->booking_model->getBookingByUser($nickname, $bookingState);
        if(count($result)>0){
            $this->response(array('status' => true, 'result' => $result), 200);
        } else {
            $this->response(array('status' => false, 'result' => "-1"), 200);
        }
    }

    /*
    * this function is used to get detail of the booking information 
    which the user want to see by id of booking
    */
    public function getMyBooking()
    {
        $nickname = $this->input->post("nickname");
        $bookingState = $this->input->post("bookingState");
        $result = $this->booking_model->getBookingByUser($nickname, $bookingState);
        if(count($result)>0){
            $this->response(array('status' => true, 'result' => $result), 200);
        } else {
            $this->response(array('status' => false, 'result' => "-1"), 200);
        }
    }

    public function testingAjax_post()
    {
        $request = $this->post();
        $data = $request['data'];
        for ($i = 0; $i < 1; $i++) {
            $result = $this->shop_model->add($data);
            if ($result == 0) break;
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
        $booking_id = $this->input->post("booking_id"); 
        $result = $this->booking_model->updateStateByBookingId($booking_id, 3);
        if($result){
            $this->response(array('status' => true, 'result' => $result), 200);
        } else {
            $this->response(array('status' => false, 'result' => "-1"), 200);
        }
    }
}

/* End of file User_Manage.php */
/* Location: ./application/controllers/api/User_Manage.php */