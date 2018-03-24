<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class accept_address_model extends CI_Model
{
    /**
    *This is function to check existing with new address
    */
    function checkExisting($info)
    {
        $this->db->select("no");
        $this->db->from("accept_address");
        $this->db->where("address", $info->{'address'});
        $this->db->where("user_id", $info->{'user_id'});
        $query = $this->db->get();
        $result = $query->result();
        return (count($result)>0)?false:true;
    }

    /**
    *This is function to add addresses where user can accept the goods paid
    */
    function addAddressByUser($info)
    {
        if($this->checkExisting($info)){
            $this->db->insert("accept_address", $info);
            return true;
        }
        else{
            return false;
        }
    }

    /**
    *This is function to get addresses where user can accept the goods paid
    */
    function getAddressByUser($userId)
    {
        $this->db->select("*");
        $this->db->from("accept_address");
        $this->db->where("user_id", $userId);
        $query = $this->db->get();
        return $query->result();
    }

    /**
    *This is function to change addresses by address_id
    */
    function changeAddressById($addressId, $info)
    {
        if($this->checkExisting($info)){
            $this->db->where("no", $addressId);
            $this->db->update("accept_address", $info);
            return true;
        }
        else
        {
            return false;
        }
    }

    /**
    *This is function to mark address as actual address by id
    */
    function checkAddressById($addressId, $userId)
    {
        $info['state'] = 1;
        $this->db->where("no", $addressId);
        $this->db->update("accept_address", $info);
        $info['state'] = 0;
        $this->db->where_not_in("no", $addressId);
        $this->db->where("user_id", $userId);
        $this->db->update("accept_address", $info);
        return $this->db->affected_rows();
    }

    /**
    *This is function to delete address by id
    */
    function deleteAddressById($addressId)
    {
        $this->db->where("no", $addressId);
        $this->db->delete("accept_address");
        return $this->db->affected_rows();
    }

}

/* End of file accept_address_model.php */
/* Location: .application/models/accept_address_model.php */
