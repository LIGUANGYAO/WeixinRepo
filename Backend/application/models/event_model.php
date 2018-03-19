<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class event_model extends CI_Model
{
    /**
     * This function is used to get the event listing count
     * @param string $searchText : This is optional search text
     * @return number $count : This is row count
     */
    function eventListingCount($searchStatus = null , $searchText = '', $searchType, $searchRole, $searchState)
    {
        $query = "select event.id, event.name, event.type, event.state, event.reg_time,
                    user.nickname, user.phone, user.role from event, user where event.organizer_id = user.no";
        if($searchRole != 10){
            $query = $query." and user.role = " . $searchRole ;
        }
        if($searchState != 10){
            $query = $query." and event.state = " . $searchState ;
        }
        if($searchType != 100){
            $query = $query." and event.type = " . $searchType;
        }
        if (!empty($searchText)) {
            if(isset($searchStatus)){
                if ($searchStatus == '0') {
                    $query = $query." and (event.name LIKE '%" . $searchText . "%')";
                } else if ($searchStatus == '1') {
                    $query = $query." and (user.nickname LIKE '%" . $searchText . "%')";
                } else {
                    $query = $query." and (user.phone LIKE '%" . $searchText . "%')";
                }
            }
        }
        $result = $this->db->query($query);

        return count($result->result());
    }

    /**
     * This function is used to get the event listing count
     * @param string $searchText : This is optional search text
     * @param number $page : This is pagination offset
     * @param number $segment : This is pagination limit
     * @return array $result : This is result
     */
    function eventListing($searchStatus = null, $searchText = '', $searchType, $searchRole, $searchState, $page, $segment)
    {
        $query = "select event.id, event.name, event.type, event.state, event.reg_time,
                    user.nickname, user.phone, user.role from event, user where event.organizer_id = user.no";
        if($searchRole != 10){
            $query = $query." and user.role = " . $searchRole ;
        }
        if($searchState != 10){
            $query = $query." and event.state = " . $searchState ;
        }
        if($searchType != 100){
            $query = $query." and event.type = " . $searchType;
        }
        if (!empty($searchText)) {
            if(isset($searchStatus)){
                if ($searchStatus == '0') {
                    $query = $query." and (event.name LIKE '%" . $searchText . "%')";
                } else if ($searchStatus == '1') {
                    $query = $query." and (user.nickname LIKE '%" . $searchText . "%')";
                } else {
                    $query = $query." and (user.phone LIKE '%" . $searchText . "%')";
                }
            }
        }
        if($segment!=""){
            $query = $query." limit ".$segment.", ".$page;
        }
        else{
            $query = $query." limit 0, ".$page;
        }
        $result = $this->db->query($query);

        return $result->result();        
    }

    function getEventType()
    {
        $this->db->select('*');
        $this->db->from('event_type');
        $query = $this->db->get();

        return $query->result();
    }

/**
     * This function is used to get event detail with bookingId
     * @param {number} $bookingId : This is booking id
     * @return {mixed} $result : This is searched result
     */
    function getEventDetailByBookingId($bookingId)
    {
        $this->db->select("event.name,event.cost, user.name as username, user.role,event.id");
        $this->db->from("event");
        $this->db->join("booking", "booking.event_id = event.id");
        $this->db->join("user", "user.no = event.organizer_id");
        $this->db->where("booking.id", $bookingId);
        $query = $this->db->get();
        return $query->result();
    }
/**
     * This function is used to get event detail with eventId
     * @param {number} $eventId : This is event id
     * @return {mixed} $result : This is searched result
     */
    function getEventDetailById($eventId)
    {
        $this->db->select("user.role");
        $this->db->from("user, event");
        $this->db->where("event.id", $eventId);
        $this->db->where("user.no = event.organizer_id");
        $query = $this->db->get();
        $result = $query->result();
        if($result[0]->role == 1)
        {
            $query = $this->db->query("SELECT event.pic, event.type,event.name as eventName, event.limit, event.cost, event.start_time, 
                event.end_time,event.comment, event.rating, event.address1, event.address2,event.address3, event.address4, event.state, 
                boss.site_name,boss.site_address, user.name, user.phone, user.role
            FROM event
                INNER JOIN user 
                    ON (event.organizer_id = user.no)
                INNER JOIN boss 
                    ON (boss.boss_id = user.no)
            WHERE event.id = ".$eventId.";");
        }
        else
        {
            $query = $this->db->query("SELECT event.pic, event.type,event.name as eventName, event.limit, event.cost, event.start_time,
                event.end_time, event.comment, event.rating, event.address1, event.address2,event.address3, event.address4,event.additional, event.state,
                user.name, user.phone, user.role
            FROM event
                INNER JOIN user 
                    ON (event.organizer_id = user.no)
            WHERE event.id = ".$eventId.";");
        }
        return $query->result();
    }
    
    /**
     * This function used to get event's forbidden information by id
     * @param number $Id : This is event id
     * @return array $result : This is event information
     */
    function getOrganizerId($id)
    {
        $this->db->select('organizer_id');
        $this->db->from('event');
        $this->db->where('id', $id);
        $query = $this->db->get();

        return $query->row();
    }

    function getEventById($eventId)
    {
        $this->db->select("event.id,event.name,event.cost,user.name as username,user.role");
        $this->db->from("user, event");
        $this->db->where("user.no = event.organizer_id");
        $this->db->where("event.id", $eventId);
        $query = $this->db->get();

        return $query->result();
    }

    /**
     * This function is used to delete the event information
     * @param number $eventId : This is event id
     * @return boolean $result : TRUE / FALSE
     */
    function deleteEvent($eventId)
    {
        $this->db->where('id', $eventId);
        $this->db->delete('event');
        return true;
    }

    /**
     * This function is used to change event state
     * @param number $eventId : This is event id
     * @param number $state : This is event state
     */
    function updateStateById($eventId, $state)
    {
        $this->db->where('no', $eventId);
        $this->db->update('event', $state);
        return $this->db->affected_rows();
    }

    /**
     * This function is used to change event state with now()
     * @return array $event : This is event changed state
     */
    function checkStateByTime()
    {
        $this->db->select("id");
        $this->db->from("event");
        $this->db->where("date(end_time) <= current_date()");
        $query = $this->db->get();
        $result = $query->result();
        $state['state'] = 2;
        foreach($result as $eventId)
        {
            $this->updateStateById($eventId->id, $state);
        }
        return $result;
    }
}

/* End of file event_model.php */
/* Location: .application/models/event_model.php */
