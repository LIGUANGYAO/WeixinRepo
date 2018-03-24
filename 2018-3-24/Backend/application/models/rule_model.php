<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class rule_model extends CI_Model
{
    /**
    *This is function to get the cost per month
    */
    function getMemberCost()
    {
        $this->db->select("value");
        $this->db->from("rule");
        $this->db->where("no", 7);
        $query = $this->db->get();
        return $query->result();
    }

}

/* End of file rule_model.php */
/* Location: .application/models/rule_model.php */
