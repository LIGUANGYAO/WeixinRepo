<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class booking_model extends CI_Model
{
    
    /**
     * This function is used to get some information of booking
     * @param number $bookingId : This is id of booking
     * @return number $count : This is information of booking found
     */
    function getBookingById($bookingId)
    {
        $this->db->select("booking.reg_num, booking.state,booking.id, booking.pay_type");
        $this->db->select("event.name, event.type, event.limit, event.cost, 
            event.start_time, event.end_time, event.address1, event.address2, event.address3, event.address4");
        $this->db->select("user.name as userName, user.phone");
        $this->db->from("booking, user, event");
        $this->db->where("event.id = booking.event_id");
        $this->db->where("user.no = event.organizer_id");
        $this->db->where("booking.id", $bookingId);
        $query = $this->db->get();
        return $query->result();
    }

    /**
     * This function is used to get detailed information of booking
     * @param number $bookingId : This is id of booking
     * @return number $count : This is information of booking found
     */
    function getBookingDetailById($bookingId)
    {
        $this->db->select("user.avatar,user.name,user.phone, booking.reg_num, booking.pay_type,booking.id");
        $this->db->from("booking");
        $this->db->join("user", "booking.user_id = user.no");
        $this->db->where("booking.id", $bookingId);
        $query = $this->db->get();
        return $query->result();
    }

        /**
     * This function is used to get detailed information of booking
     * @param number $eventId : This is id of event
     * @return number $count : This is information of booking found
     */
    function getBookingDetailByEvent($eventId)
    {
        $this->db->select("user.avatar,user.name,user.phone, booking.reg_num, booking.pay_type,booking.id");
        $this->db->from("booking");
        $this->db->join("user", "booking.user_id = user.no");
        $this->db->where("booking.id", $eventId);
        $query = $this->db->get();
        return $query->result();
    }


    /**
    *This function is user to get organizerId 
    *@param number $bookingId: this is id of booking
    *@return number $count: This is organizerId of booking
    */
    function getEventId($bookingId)
    {
        $this->db->select("event_id");
        $this->db->from("booking");
        $this->db->where("id" ,$bookingId);
        $query = $this->db->get();
        return $query->row();
    }

    /**
    *This function is user to get UserId 
    *@param number $bookingId: this is id of booking
    *@return number $count: This is UserId of booking
    */
    function getUserId($bookingId)
    {
        $this->db->select("user_id");
        $this->db->from("booking");
        $this->db->where("id" ,$bookingId);
        $query = $this->db->get();
        return $query->row();
    }
    /**
     * This function is used to get the amount of booking information
     * @param number $searchName : This is id of member or phone
     * @return number $count : This is information of booking found
     */
    function bookingListingCount($searchStatus = null, $searchName = '', $searchType = 100,  $searchState = 10, $searchPay = 10)
    {
        $this->db->select("*");
        $this->db->from("booking");
        $query = $this->db->get();
        return count($query->result());
    }

    /**
     * This function is used to get the amount of booking information
     * @param number $searchName : This is id of member or phone
     * @return number $count : This is information of booking found
     */
    function bookingListing($searchStatus = null, $searchText = '', $searchType = 100,  $searchState = 10, $searchPay = 10, $page, $segment)
    {
        $query = "select booking.id, booking.reg_num, booking.state, booking.submit_time, booking.pay_type,
                    event.cost, event.name as event_name, event.type, user.name, user.phone 
                    from booking, user, event
                    where booking.event_id = event.id and booking.user_id = user.no";
        if($searchPay != 10){
            $query = $query." and booking.pay_type = " . $searchPay ;
        }
        if($searchState != 10){
            $query = $query." and booking.state = " . $searchState ;
        }
        if($searchType != 100){
            $query = $query." and event.type = " . $searchType;
        }
        if (!empty($searchText)) {
            if(isset($searchStatus)){
                if ($searchStatus == '0') {
                    $query = $query." and (booking.id LIKE '%" . $searchText . "%')";
                } else if ($searchStatus == '1') {
                    $query = $query." and (user.name LIKE '%" . $searchText . "%')";
                } else if ($searchStatus == '2') {
                    $query = $query." and (user.phone LIKE '%" . $searchText . "%')";
                } else {
                    $query = $query." and (event.name LIKE '%" . $searchText . "%')";
                }
            }
        }
        $this->db->limit($page, $segment);
        $result = $this->db->query($query);
        return $result->result();
    }

    function getCreationName($searchStatus = null, $searchText = '', $searchType = 100,  $searchState = 10, $searchPay = 10,  $page, $segment)
    {
        $query = "select user.nickname as creation_name, count(booking.id)
                    from booking, user, event
                    where booking.event_id = event.id and event.organizer_id = user.no";
        if($searchPay != 10){
            $query = $query." and booking.pay_type = " . $searchPay ;
        }
        if($searchState != 10){
            $query = $query." and booking.state = " . $searchState ;
        }
        if($searchType != 100){
            $query = $query." and event.type = " . $searchType;
        }
        if (!empty($searchText)) {
            if(isset($searchStatus)){
                if ($searchStatus == '0') {
                    $query = $query." and (booking.id LIKE '%" . $searchText . "%')";
                } else if ($searchStatus == '1') {
                    $query = $query." and (user.name LIKE '%" . $searchText . "%')";
                } else if ($searchStatus == '2') {
                    $query = $query." and (user.phone LIKE '%" . $searchText . "%')";
                } else {
                    $query = $query." and (event.name LIKE '%" . $searchText . "%')";
                }
            }
        }
        $query = $query." group by booking.id";
        if($segment!=""){
            $query = $query." limit ".$segment.", ".$page;
        }
        else{
            $query = $query." limit 0, ".$page;
        }
        $result = $this->db->query($query);
        return $result->result();
    }

    /**
     * This function is used to get the information of booking
     * @param number $userId : This is id of member
     * @param number $eventId : This is id of event
     * @return number $count : This is information of booking found
     */
    function getTotalByUserEvent($userId, $eventId)
    {
        $this->db->select("sum(booking.reg_num) as amount");
        $this->db->from('booking');
        $this->db->where('booking.user_id', $userId);
        $this->db->where('booking.event_id', $eventId);
        $query = $this->db->get();
        return $query->result();
    }

    /**
     * This function is used to get the information of booking by nickname and state
     * @param number $nickname : This is nickname of member
     * @param number $state : This is state of booking
     * @return array $result : This is information of booking found
     */
    function getBookingByUser($nickname, $state)
    {
        $this->db->select("booking.id, booking.state, booking.reg_num, booking.pay_type");
        $this->db->select("event.name, event.type, event.cost, event.address1, event.pic, event.start_time, event.end_time");
        $this->db->from("booking");
        $this->db->join("event","event.id = booking.event_id");
        $this->db->join("user", "user.no = booking.user_id");
        $this->db->where("user.nickname", $nickname);
        $this->db->where("booking.state", $state);
        $this->db->where("event.publicity", 1);
        $query = $this->db->get();
        return $query->result();
    }

    /**
     * This function is used to change the state of booking where the event has ended
     * @param array $event : This is event_id of booking
     * @return boolean $result : This is boolean value of change the state of booking
     */
    function changeStateByEvent($event)
    {
        $state['state'] = 2;
        foreach ($event as $eventId) {
            $this->updateStateByEventId($eventId->id, $state);
        }
        return true;
    }

    /**
     * This function is used to change the state of booking by Event Id
     * @param array $event : This is event_id of booking
     * @return boolean $result : This is boolean value of change the state of booking
     */
    function updateStateByEventId($eventId, $state)
    {
        $this->db->where("event_id", $eventId);
        $this->db->update("booking", $state);
        return true;
    }

    /**
     * This function is used to change the state of booking by booking_Id
     * @param array $event : This is event_id of booking
     * @return boolean $result : This is boolean value of change the state of booking
     */
    function updateStateByBookingId($bookingId, $state)
    {
        $this->db->where("id", $bookingId);
        $this->db->update("booking", $state);
        return true;
    }
}

/* End of file booking_model.php */
/* Location: .application/models/booking_model.php */
