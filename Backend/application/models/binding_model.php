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
        $query = "select binding_history.no, binding_history.state, binding_history.submit_time, binding.bank_phone, binding.credit_no, binding_history.amount, binding.receiver, binding.bank, binding.id_no,binding_history.comment,binding_history.binding_time,
                    user.name, user.phone
                    from binding, `user`, binding_history 
                    where binding.user_id = user.no and binding.no = binding_history.binding_no and binding_history.no=".$bindingId;
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
        $query = "select binding_history.no, binding_history.state, binding_history.submit_time, binding.bank_phone, binding.credit_no, binding_history.amount, binding.receiver, binding.id_no,
                    user.name, user.phone
                    from binding, `user`, binding_history 
                    where binding.user_id = user.no and binding.no = binding_history.binding_no";
        if($searchState != 10){
            $query = $query . " and binding_history.state like '%" . $searchState ."%'";
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
        $query = "select binding_history.no, binding_history.state, binding_history.submit_time, binding.bank_phone, binding.credit_no, binding_history.amount, binding.receiver, binding.id_no,
                    user.name, user.phone
                    from binding, `user`, binding_history 
                    where binding.user_id = user.no and binding.no = binding_history.binding_no";
        if($searchState != 10){
            $query = $query . " and binding_history.state like '%" . $searchState ."%'";
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

    /**
     * This function is used to update the binding information
     * @param string $bindingId : This is id of binding
     * @param array $info : This is information of binding
     * @return number $count : This is row count
     */
    function updateStateById($bindingId, $info)
    {
        $this->db->where("no", $bindingId);
        $this->db->update("binding_history", $info);
        $result = $this->db->affected_rows();
        return $result;
    }

    /**
     * This function is used to get the binding information of current user
     * @param string $userId : This is id of user
     * @return array $result : This is information found
     */
    function getBinding($userId)
    {
        $this->db->select("*");
        $this->db->where("user_id", $userId);
        $this->db->from("binding");
        $result = $this->db->get();
        return $result->result();
    }

    /**
     * This function is used to add the binding information of current user
     * @param array $info : This is array of binding information
     * @return number $result : This is number of rows inserted into table
     */
    function addBinding($info)
    {
        $this->db->insert("binding", $info);
        $result = $this->db->affected_rows();
        return $result;
    }

    /**
     * This function is used to add the binding history of current user
     * @param array $userId : This is id of user
     * @param array $info : This is array of binding information
     * @return number $result : This is number of rows inserted into table
     */
    function addBindingHistory($userId, $cost)
    {
        $query = $this->db->query("insert payment_history(user_id, title, amount, minus, submit_time, status) values(".$userId.",'申请提现',".$cost.", 1,'".date("Y-m-d h:i:s")."', '提现中')");
        $this->db->select("amount,no");
        $this->db->from("binding");
        $this->db->where("user_id", $userId);
        $result = $this->db->get()->result();
        $amount = $result[0]->amount - $cost;
        $this->db->query("update binding set amount=".$amount);
        $info['amount'] = $cost;
        $info['binding_no'] = $result[0]->no;
        $info['submit_time'] = date("Y-m-d h:i:s");
        $this->db->insert("binding_history", $info);
        $result = $this->db->affected_rows();
        return $result;
    }

    /**
     * This function is used to get the binding history of current user
     * @param array $userId : This is id of user
     * @return number $result : This is number of rows inserted into table
     */
    function getBindingHistory($userId)
    {
        $this->db->select("binding_history.submit_time,binding_history.amount,binding_history.binding_time, binding_history.submit_time, binding_history.state");
        $this->db->from("binding_history, binding");
        $this->db->join("binding", "binding.no = binding_history.binding_no");
        $this->db->where("binding.user_id", $userId);
        $this->db->group_by("binding_history.no");
        $query = $this->db->get();
        return $query->result();
    }

    /**
     * This function is used to get the payment history of current user
     * @param number $userId : This is id of user
     * @return array $result : This is information array of payment of user
     */
    function getPaymentHistory($userId)
    {
        $this->db->select("*");
        $this->db->from("payment_history");
        $this->db->where("user_id", $userId);
        $query = $this->db->get();
        return $query->result();
    }
}

/* End of file binding_model.php */
/* Location: .application/models/binding_model.php */
