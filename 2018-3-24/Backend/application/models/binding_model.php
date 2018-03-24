<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class binding_model extends CI_Model
{
    /**
     * This function is used to get the binding 
     * @param number $userId : This is id of binding
     * @return number $count : This is row count
     */
    function getBindingDetailById($bindingId)
    {
        $query = "select binding.no, binding.state, binding.submit_time, binding.bank_phone, binding.credit_no, binding.cost, binding.reciever, binding.bank, binding.reciever_id,binding.comment,binding.recieve_time,
                    user.name, user.phone
                    from binding, `user` 
                    where binding.user_id = user.no";
        $result = $this->db->query($query);
        return $result->result();
    }

    /**
     * This function is used to get the binding listing count
     * @param string $searchText : This is optional search text
     * @return number $count : This is row count
     */
    function bindingListingCount($searchStatus = null , $searchText = '', $searchState)
    {
        $query = "select binding.no, binding.state, binding.submit_time, binding.bank_phone, binding.credit_no, binding.cost, binding.reciever, binding.reciever_id,
                    user.name, user.phone
                    from binding, `user` 
                    where binding.user_id = user.no";
        if($searchState != 10){
            $query = $query . " and binding.state like '%" . $searchState ."%'";
        }
        if (!empty($searchText)) {
            if(isset($searchStatus)){
                if ($searchStatus == '0') {
                    $query = $query." and (user.phone LIKE '%" . $searchText . "%')";
                } else if ($searchStatus == '1') {
                    $query = $query." and (user.name LIKE '%" . $searchText . "%')";
                } else {
                    $query = $query." and (binding.reciever LIKE '%" . $searchText . "%')";
                }
            }
        }
        $result = $this->db->query($query);

        return count($result->result());
    }

    /**
     * This function is used to get the binding listing count
     * @param string $searchText : This is optional search text
     * @return number $count : This is row count
     */
    function bindingListing($searchStatus = null , $searchText = '', $searchState, $page, $segment)
    {
        $query = "select binding.no, binding.state, binding.submit_time, binding.bank_phone, binding.credit_no, binding.cost, binding.reciever, binding.reciever_id,
                    user.name, user.phone 
                    from binding, `user` 
                    where binding.user_id = user.no";
        if($searchState != 10){
            $query = $query . " and binding.state like '%" . $searchState ."%'";
        }
        if (!empty($searchText)) {
            if(isset($searchStatus)){
                if ($searchStatus == '0') {
                    $query = $query." and (user.phone LIKE '%" . $searchText . "%')";
                } else if ($searchStatus == '1') {
                    $query = $query." and (user.name LIKE '%" . $searchText . "%')";
                } else {
                    $query = $query." and (binding.reciever LIKE '%" . $searchText . "%')";
                }
            }
        }
        $this->db->limit($page, $segment);
        $result = $this->db->query($query);

        return $result->result();
    }

    function updateStateById($bindingId, $info)
    {
        $this->db->where("no", $bindingId);
        $this->db->update("binding", $info);
        $result = $this->db->affected_rows();
        return $result;
    }

}

/* End of file binding_model.php */
/* Location: .application/models/binding_model.php */
