<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class honey_model extends CI_Model
{
    /**
     * This function is used to get the honey in 5km from current user
     * @param float $longitude : This is longitude of current user
     * @param float $latitude: This is latitude of the current user
     * @return array $result : information of honey found
     */
    function getHoneyByDistance($longitude, $latitude)
    {
        $this->db->select("no, longitude, latitude, amount, pick_choice");
        $this->db->from("honey");
        $this->db->where("( 6371 * acos( cos( radians($latitude) ) * cos( radians( latitude) ) 
   * cos( radians(longitude) - radians($longitude)) + sin(radians($latitude)) 
   * sin( radians(latitude))))<=5");
        $query = $this->db->get();
        return $query->result();
    }

    /**
     * This function is used to subtract the honey with amount current user catch
     * @param number $amount : This is amount of user cathced
     * @param number $no : This is no of honey user catched
     * @return boolean $result : state of subtract
     */
    function catchHoney($no, $amount)
    {
        $this->db->select("amount");
        $this->db->from("honey");
        $this->db->where("no", $no);
        $result = $this->db->get()->result();
        if($result[0]->amount == $amount)
        {
            $this->db->where("no", $no);
            $this->db->delete("honey");
        }
        else{
            $this->db->query("update honey set amount=(amount-$amount), pick_choice=pick_choice+1 where no=$no");
        }
        $result = $this->db->affeted_rows();
        return (count($result)>0)?true:false;
    }

    /**
     * This function is used to check the honey which are available from time limit
     * @return boolean $result : state of subtract
     */
    function checkHoney()
    {
        $now = date("Y-m-d h:i:s");
        $this->db->query("delete from honey where timestampdiff(second, create_time, $now)>86400");
        $result = $this->db->affeted_rows();
        return (count($result)>0)?true:false;
    }
}

/* End of file honey_model.php */
/* Location: .application/models/honey_model.php */
