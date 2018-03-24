<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class member_state_model extends CI_Model
{
    /**
     * This function is used to get the member_state 
     * @param number $userId : This is id of member
     * @return number $count : This is row count
     */
    function getStateById($userId)
    {
        $this->db->select("date(expire_time)>=current_date() as state");
        $this->db->from('member_state');
        $this->db->where('user_id', $userId);
        $this->db->order_by('date(expire_time)','DESC');
        $this->db->limit(1);
        $query = $this->db->get();
        return $query->result();
    }

    /**
     * This function is used to get the member info
     * @param number $userId : This is id of member
     * @return number $count : This is row count
     */
    function getMemberInfo($userId)
    {
        $this->db->select("*");
        $this->db->select("date(expire_time)>=current_date() as state");
        $this->db->from("member_state");
        $query = $this->db->get();
        return $query->result();
    }

    /**
     * This function is used to get the member info
     * @param number $userId : This is id of member
     * @param number $cost : This is cost user paid
     * @param number $memberCost : This is member cost per month
     */
    function setMemberState($userId, $cost, $memberCost)
    {
        $this->db->select("no, expire_time");
        $this->db->select("date(expire_time)>=current_date() as state");
        $this->db->from("member_state");
        $this->db->where("user_id", $userId);
        $query = $this->db->get();
        $expire_state = $query->result();
        $month = $cost / $memberCost;
        $data['user_id'] = $userId;
        $data['cost'] = $cost;
        $now = date("Y-m-d h:i:a");
        $data['submit_time'] = $now;
        if(count($expire_state)>0){
            if($expire_state[count($expire_state)-1]->state){
                $date_object = new DateTime(date($expire_state[count($expire_state)-1]->expire_time));
                $expire_time = date_add($date_object, date_interval_create_from_date_string($month." months"));
                $data['expire_time'] = date_format($expire_time,"Y-m-d");
                $this->db->where("no", $expire_state[count($expire_state)-1]->no);
                $this->db->update("member_state", $data);
            }
        }
        else{
            $date_object = new DateTime(date("Y-m-d"));
            $expire_time = date_add($date_object, date_interval_create_from_date_string($month." months"));
            $data['expire_time'] = date_format($expire_time,"Y-m-d");
            $this->db->insert("member_state", $data);
        }
        $result = $this->db->affected_rows();
        return $result;
    }

    /**
     * This function is used to get the member info
     * @param number $userId : This is id of member
     * @return number $count : This is row count
     */
    function getMemberState($userId)
    {
        $this->db->select("no, expire_time");
        $this->db->select("date(expire_time)>=current_date() as state");
        $this->db->from("member_state");
        $this->db->where("user_id", $userId);
        $query = $this->db->get();
        $expire_state = $query->result();
        if(count($expire_state)>0){
            return $expire_state[count($expire_state)-1];
        }
        return null;
    }

    /**
     * This function is used to get the member listing count
     * @param string $searchText : This is optional search text
     * @return number $count : This is row count
     */
    function memberListingCount($searchStatus = null , $searchText = '', $searchState)
    {
        $query = "select member_state.no, member_state.cost, member_state.expire_time, member_state.submit_time,
                    user.name, user.phone, date(expire_time)>=current_date() as state from member_state, user where member_state.user_id = user.no";
        if($searchState == 1){
            $query = $query . " and date(member_state.expire_time)>=current_date()";
        }
        else if($searchState == 2)
        {
            $query = $query . " and date(member_state.expire_time)<current_date()";
        }
        if (!empty($searchText)) {
            if(isset($searchStatus)){
                if ($searchStatus == '0') {
                    $query = $query." and (member_state.no LIKE '%" . $searchText . "%')";
                } else if ($searchStatus == '1') {
                    $query = $query." and (user.name LIKE '%" . $searchText . "%')";
                } else {
                    $query = $query." and (user.phone LIKE '%" . $searchText . "%')";
                }
            }
        }
        $result = $this->db->query($query);

        return count($result->result());
    }

    /**
     * This function is used to get the member listing count
     * @param string $searchText : This is optional search text
     * @return number $count : This is row count
     */
    function memberListing($searchStatus = null , $searchText = '', $searchState,$page, $segment)
    {
        $query = "select member_state.no, member_state.cost, member_state.expire_time, member_state.submit_time,
                    user.name, user.phone, date(expire_time)>=current_date() as state from member_state, user where member_state.user_id = user.no";
        if($searchState == 1){
            $query = $query . " and date(member_state.expire_time)>=current_date()";
        }
        else if($searchState == 2)
        {
            $query = $query . " and date(member_state.expire_time)<current_date()";
        }
        if (!empty($searchText)) {
            if(isset($searchStatus)){
                if ($searchStatus == '0') {
                    $query = $query." and (member_state.no LIKE '%" . $searchText . "%')";
                } else if ($searchStatus == '1') {
                    $query = $query." and (user.name LIKE '%" . $searchText . "%')";
                } else {
                    $query = $query." and (user.phone LIKE '%" . $searchText . "%')";
                }
            }
        }
        $this->db->limit($page, $segment);
        $result = $this->db->query($query);

        return $result->result();
    }

}

/* End of file member_state_model.php */
/* Location: .application/models/member_state_model.php */
