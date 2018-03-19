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

    function getMemberInfo($userId)
    {
        $this->db->select("*");
        $this->db->select("date(expire_time)>=current_date() as state");
        $query = $this->db->get();
        return $query->result();
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
