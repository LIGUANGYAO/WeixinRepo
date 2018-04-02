<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class favourite_event_model extends CI_Model
{
    
    /**
     * This function is used to get some information of favourite_event
     * @param number $userId : This is id of current user
     * @return boolean $result: state of like
     */
    function is_rating($user_id)
    {
        $this->db->select("no");
        $this->db->from('favourite_event');
        $this->db->where('user_id', $user_id);
        $query = $this->db->get();
        return (count($query->result())>0)?true:false;
    }
}

/* End of file favourite_event_model.php */
/* Location: .application/models/favourite_event_model.php */
