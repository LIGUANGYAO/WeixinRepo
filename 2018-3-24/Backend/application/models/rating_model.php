<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class rating_model extends CI_Model
{
    
    /**
     * This function is used to get some information of rating
     * @param number $userId : This is id of member
     * @param number $eventId : This is id of event
     * @return number $count : This is information of rating found
     */
    function getRatingDetailById($ratingId)
    {
        $this->db->select("user.name, user.phone");
        $this->db->select("rating.reg_num, rating.pay_type");
        $this->db->from('rating');
        $this->db->join('user','user.no = rating.user_id');
        $this->db->where('rating.id', $ratingId);
        $query = $this->db->get();
        return $query->result();
    }

    /**
     * This function is used to get some information of rating
     * @param number $userId : This is id of member
     * @param number $eventId : This is id of event
     * @return number $count : This is information of rating found
     */
    function getRatingContentById($userId,$organizerId)
    {
        $this->db->select("point, comment");
        $this->db->from('rating');
        $this->db->where('user_id', $userId);
        $this->db->where('boss_id', $organizerId);
        $query = $this->db->get();
        return $query->result();
    }

    function getRatingByBoss($bossId)
    {
        $this->db->select("*");
        $this->db->from("rating");
        $this->db->where("boss_id", $bossId);
        $query = $this->db->get();
        return $query->result();
    }

    /**
     * This function is used to get the amount of rating information
     * @param number $searchName : This is id of member or phone
     * @return number $count : This is information of rating found
     */
    function ratingListingCount($searchStatus = null, $searchName = '', $searchType = 100,  $searchState = 10, $searchPay = 10)
    {
        $this->db->select("*");
        $this->db->from("rating");
        $query = $this->db->get();
        return count($query->result());
    }

    /**
     * This function is used to get the amount of rating information
     * @param number $searchName : This is id of member or phone
     * @return number $count : This is information of rating found
     */
    function ratingListing($searchStatus = null, $searchText = '', $searchType = 100,  $searchState = 10, $searchPay = 10, $page, $segment)
    {
        $query = "select rating.id, rating.reg_num, rating.state, rating.submit_time, rating.pay_type,
                    event.cost, event.name as event_name, event.type, user.name, user.phone 
                    from rating, user, event
                    where rating.event_id = event.id and rating.user_id = user.no";
        if($searchPay != 10){
            $query = $query." and rating.pay_type = " . $searchPay ;
        }
        if($searchState != 10){
            $query = $query." and rating.state = " . $searchState ;
        }
        if($searchType != 100){
            $query = $query." and event.type = " . $searchType;
        }
        if (!empty($searchText)) {
            if(isset($searchStatus)){
                if ($searchStatus == '0') {
                    $query = $query." and (rating.id LIKE '%" . $searchText . "%')";
                } else if ($searchStatus == '1') {
                    $query = $query." and (user.name LIKE '%" . $searchText . "%')";
                } else if ($searchStatus == '2') {
                    $query = $query." and (user.phone LIKE '%" . $searchText . "%')";
                } else {
                    $query = $query." and (event.name LIKE '%" . $searchText . "%')";
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

    /**
    *This function is used to add new rating
    *@param array info : all data to insert
    *@return boolean $result: state of insert
    **/
    function addRating($info)
    {
        $this->db->insert("rating", $info);
        
        return true;
    }
}

/* End of file rating_model.php */
/* Location: .application/models/rating_model.php */
