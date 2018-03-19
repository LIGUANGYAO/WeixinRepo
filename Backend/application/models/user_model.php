<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class user_model extends CI_Model
{
    /**
     * This function is used to get the user listing count
     * @param string $searchText : This is optional search text
     * @return number $count : This is row count
     */
    function userListingCount($searchStatus = null , $searchText = '', $searchRole , $searchState , $searchForbidden)
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
    function userListing($searchStatus = null, $searchText = '', $searchRole, $searchState, $searchForbidden, $page, $segment)
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
                boss.allow_pic, boss.id_pic1, boss.id_pic2, boss.id_no, boss.site_name, boss.site_address 
                from user, boss where user.no = boss.boss_id and user.no = ".$userId.";");
            $result = $query->result();
        }
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
     * This function is used to match users password for change password
     * @param number $userId : This is user id
     */
    function matchOldPassword($userId, $oldPassword)
    {
        $this->db->select('userId, password');
        $this->db->where('userId', $userId);
        $this->db->where('isDeleted', 0);
        $query = $this->db->get('user');

        $user = $query->result();

        if (!empty($user)) {
            if (verifyHashedPassword($oldPassword, $user[0]->password)) {
                return $user;
            } else {
                return NULL;
            }
        } else {
            return NULL;
        }
    }

    /**
     * This function is used to change users password
     * @param number $userId : This is user id
     * @param array $userInfo : This is user updation info
     */
    function changePassword($userId, $userInfo)
    {
        $this->db->where('userId', $userId);
        $this->db->where('isDeleted', 0);
        $this->db->update('user', $userInfo);

        return $this->db->affected_rows();
    }

    /**
     * This function is used to add unsigned new user
     * @param array $userInfo : This is user info including nickname and avatarURL
     */
    function addNewUser($userInfo)
    {
        $this->db->insert("user", $userInfo);
        return true;
    }

    function getState($nickname)
    {
        $this->db->select("*");
        $this->db->from("user");
        $query = $this->db->get();
        return $query->result();
    }
}

/* End of file user_model.php */
/* Location: .application/models/user_model.php */
