<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class user_model extends CI_Model
{
    /**
     * This function is used to get the user listing count
     * @param string $searchText : This is optional search text
     * @return number $count : This is row count
     */
    function userListingCount($searchStatus = null , $searchText = '', $searchRole , $searchState , $searchForbidden, $fromTime, $toTime)
    {
        $this->db->select('*');
        $this->db->from('user');
        if (!empty($searchText)) {
            if(isset($searchStatus)){
                if ($searchStatus == '0') {
                    $likeCriteria = "(nickname  LIKE '%" . $searchText . "%')";
                } else if ($searchStatus == '1') {
                    $likeCriteria = "(name  LIKE '%" . $searchText . "%')";
                } else {
                    $likeCriteria = "(phone  LIKE '%" . $searchText . "%')";
                }
                $this->db->like($likeCriteria);
            }
        }
        if($searchRole != 10){
            $this->db->like('role', $searchRole);
        }
        if($searchState != 10){
            $this->db->like('state', $searchState);
        }
        if($searchForbidden != 10){
            $this->db->like('forbidden', $searchForbidden);
        }
        if($fromTime!=''){
            $this->db->where("date(reg_time) >= date('".$fromTime."')");
        }
        if($toTime!=''){
            $this->db->where("date(reg_time) <= date('".$toTime."')");
        }
        $query = $this->db->get();

        return count($query->result());
    }

    /**
     * This function is used to get the user listing count
     * @param string $searchText : This is optional search text
     * @param number $page : This is pagination offset
     * @param number $segment : This is pagination limit
     * @return array $result : This is result
     */
    function userListing($searchStatus = null, $searchText = '', $searchRole, $searchState, $searchForbidden, $fromTime, $toTime, $page, $segment)
    {
        $this->db->select('*');
        $this->db->from('user');
        if (!empty($searchText)) {
            if(isset($searchStatus)){
                if ($searchStatus == '0') {
                    $likeCriteria = "(nickname  LIKE '%" . $searchText . "%')";
                } else if ($searchStatus == '1') {
                    $likeCriteria = "(name  LIKE '%" . $searchText . "%')";
                } else {
                    $likeCriteria = "(phone  LIKE '%" . $searchText . "%')";
                }
                $this->db->where($likeCriteria);
            }
        }
        if($searchRole != 10){
            $this->db->where('role', $searchRole);
        }
        if($searchState != 10){
            $this->db->where('state', $searchState);
        }
        if($searchForbidden != 10){
            $this->db->where('forbidden', $searchForbidden);
        }
        if($fromTime!=''){
            $this->db->where("date(reg_time) >= date('".$fromTime."')");
        }
        if($toTime!=''){
            $this->db->where("date(reg_time) <= date('".$toTime."')");
        }
        $this->db->order_by('reg_time');
        $this->db->limit($page, $segment);
        $query = $this->db->get();

        $result = $query->result();
        return $result;
    }
/**
     * This function is used to get user detail with userId
     * @param {number} $userId : This is user id
     * @return {mixed} $result : This is searched result
     */
    function getUserDetailById($userId)
    {
        $this->db->select("*");
        $this->db->from("user");
        $this->db->where("no", $userId);
        $query = $this->db->get();
        $result = $query->result();
        if($result[0]->role == 1)
        {
            $query = $this->db->query("select user.avatar, user.nickname, user.name, user.phone, user.honey, user.state, user.role, user.forbidden,
                boss.allow_pic, boss.id_pic1, boss.id_pic2, boss.id_no, boss.site_name, provinces.province,cities.city,areas.area,boss.detail_address 
                from user, boss, provinces, cities, areas where boss.province=provinces.id and boss.city=cities.id and areas.id=boss.area and user.no = boss.boss_id and user.no = ".$userId.";");
        }
        else if($result[0]->role==0){
            $query = $this->db->query("select user.avatar, user.nickname, user.state, user.role, user.forbidden,user.honey 
                from user where user.no = ".$userId.";");
        }
        else{
            $query = $this->db->query("select user.avatar, user.nickname, user.name, user.phone, user.honey, user.state, user.role, user.forbidden
                from user where user.no = ".$userId.";");
        }
        $result = $query->result();
        return $result;
    }

    /**
     * This function is used to get honey waste detail by exchange
     * @param {number} $userId : This is user id
     * @return {mixed} $result : This is searched result
     */
    function getExchangeHoneyWasteById($userId)
    {
        $this->db->select("*");
        $this->db->from("user");
        $this->db->where("no", $userId);
        $query = $this->db->get();
        $result = $query->result();
        $query = $this->db->query("select goods.cost, exchange.submit_time , exchange.no
                from exchange, goods 
                where exchange.user_id=".$userId." and exchange.good_id=goods.id;");
        $result = $query->result();
        return $result;
    }

    /**
     * This function is used to get honey waste detail by event
     * @param {number} $userId : This is user id
     * @return {mixed} $result : This is searched result
     */
    function getEventHoneyWasteById($userId)
    {
        $this->db->select("*");
        $this->db->from("user");
        $this->db->where("no", $userId);
        $query = $this->db->get();
        $result = $query->result();
        $query = $this->db->query("select rule.value, event.reg_time, event.id as no
                from event, rule
                where event.organizer_id=".$userId." and event.additional=1 and rule.no=9;");
        $result = $query->result();
        return $result;
    }

        /**
     * This function used to get user information by id
     * @param number $userId : This is user id
     * @return array $result : This is user information
     */
    function getForbiddenById($id)
    {
        $this->db->select('forbidden');
        $this->db->from('user');
        $this->db->where('no', $id);
        $query = $this->db->get();

        return $query->result();
    }

    /**
     * This function used to get user's forbidden information by id
     * @param number $Id : This is user id
     * @return array $result : This is user information
     */
    function getRoleById($id)
    {
        $this->db->select('role');
        $this->db->from('user');
        $this->db->where('no', $id);
        $query = $this->db->get();

        return $query->row();
    }

    /**
     * This function is used to update the user'forbidden information
     * @param number $forbidden : This is users updated forbidden information
     * @param number $userId : This is user id
     */
    function updateForbiddenById($userId, $forbidden)
    {
        $this->db->query("update user set forbidden=".$forbidden." where no=".$userId);

        return $this->db->affected_rows();
    }

    /**
     * This function is used to delete the user information
     * @param number $userId : This is user id
     * @return boolean $result : TRUE / FALSE
     */
    function deleteRole($roleId)
    {
        if ($roleId == '1') return false;
        $this->db->where('roleId', $roleId);
        $this->db->delete('role');
        return true;
    }


    /**
     * This function is used to change user state
     * @param number $userId : This is user id
     * @param number $state : This is user state
     */
    function updateStateById($userId, $state)
    {
        $this->db->where('no', $userId);
        $this->db->update('user', $state);
        return $this->db->affected_rows();
    }
    /**
     * This function is used to update the user information
     * @param array $userInfo : This is users updated information
     * @param number $userId : This is user id
     */
    function editUser($userInfo, $userId)
    {
        $this->db->where('userId', $userId);
        $this->db->update('user', $userInfo);

        return TRUE;
    }

    /**
     * This function is used to update the user information
     * @param array $userInfo : This is users updated information
     * @param number $userId : This is user id
     */
    function updateUser($userInfo, $usernickname)
    {
        $this->db->where('nickname', $usernickname);
        $this->db->update('user', $userInfo);

        return TRUE;
    }

    /**
     * This function is used to delete the user information
     * @param number $userId : This is user id
     * @return boolean $result : TRUE / FALSE
     */
    function deleteUser($userId, $userInfo)
    {
        $this->db->where('userId', $userId);
        $this->db->update('user', $userInfo);

        return $this->db->affected_rows();
    }

    /**
     * This function is used to add unsigned new user
     * @param array $userInfo : This is user info including nickname and avatarURL
     */
    function addNewUser($userInfo)
    {
        $result = $this->db->insert("user", $userInfo);
        return $this->db->insert_id();
    }

    /**
     * This function is used to get information of user
     * @param string $nickname : This is nickname of user
     *@return array $result: this is the array of information
     */
    function getState($nickname)
    {
        $this->db->select("*");
        $this->db->from("user");
        $this->db->where("nickname", $nickname);
        $query = $this->db->get();
        return $query->result();
    }

    /**
     * This function is used to get information of user
     * @param string $nickname : This is nickname of user
     *@return array $result: this is the array of information
     */
    function getFavouriteSite($userId)
    {
        $this->db->select("boss.site_name, boss.detail_address, boss.boss_id");
        $this->db->select("user.phone, user.avatar");
        $this->db->select("provinces.province, cities.city, areas.area");
        $this->db->from("favourite");
        $this->db->join("boss", "boss.boss_id = favourite.boss_id");
        $this->db->join("user", "favourite.boss_id = user.no");
        $this->db->join("provinces","provinces.id = boss.province");
        $this->db->join("cities","cities.id = boss.city");
        $this->db->join("areas","areas.id = boss.area");
        $this->db->where("favourite.user_id", $userId);
        $query = $this->db->get();
        return $query->result();
    }

    /**
    *This function is user to delete site from user's favourite
    *@param number $user_id: this is id of user
    * @param number $boss_id: this is id of site 
    */
    function cancelFavouriteSite($userId, $bossId)
    {
        $this->db->select("no");
        $this->db->from("favourite");
        $this->db->where("user_id", $userId);
        $this->db->where("boss_id", $bossId);
        $result = $this->db->get()->result();
        if(count($result) > 0){
            $this->db->where('user_id', $userId);
            $this->db->where('boss_id', $bossId);
            $this->db->delete('favourite');
        }
        else
        {
            $info['user_id'] = $userId;
            $info['boss_id'] = $bossId;
            $this->db->insert('favourite', $info);
        }
        return true;
    }


    /**
     * This function is used to register user
     * @param string $nickname : This is nickname of user
     *@return array $result: this is the array of information
     */
    function addAllowPic($user_id, $userInfo)
    {
        $this->db->where("boss_id", $user_id);
        $this->db->update("boss", $userInfo);
        $query = $this->db->affected_rows();
        return $query;
    }

    /**
     * This function is used to add license image of boss
     * @param string $nickname : This is nickname of user
     *@return array $result: this is the array of information
     */
    function addIDPic($user_id, $userInfo)
    {
        $this->db->where("boss_id", $user_id);
        $this->db->update("boss", $userInfo);
        $query = $this->db->affected_rows();
        return $query;
    }
    
    /**
     * This function is used to add back image of id
     * @param string $nickname : This is nickname of user
     *@return array $result: this is the array of information
     */
    function registerUser($user_id, $userInfo)
    {
        $this->db->where("no", $user_id);
        $this->db->update("user", $userInfo);
        $query = $this->db->affected_rows();
        return $query;
    }

    /**
     * This function is used to add honey
     * @param int $amount : This is amount of honey
     *@return boolean $result: this is status of adding
     */
    function catchHoney($amount, $user_id)
    {
        $this->db->query("update user set honey=honey+$amount where no=$user_id");
        return true;
    }
}

/* End of file user_model.php */
/* Location: .application/models/user_model.php */
