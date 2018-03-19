<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class boss_model extends CI_Model
{
    
    function addNewBoss($bossInfo)
    {
        $this->db->trans_start();
        $this->db->insert('boss', $bossInfo);
        $insert_id = $this->db->insert_id();
        $this->db->trans_complete();
        return $insert_id;
    }

    
    /**
     * This function is used to update the boss information
     * @param array $bossInfo : This is bosss updated information
     * @param number $bossId : This is boss id
     */
    function editboss($bossInfo, $bossId)
    {
        $this->db->where('bossId', $bossId);
        $this->db->update('boss', $bossInfo);

        return TRUE;
    }

    /**
     * This function is used to update the boss information
     * @param array $bossInfo : This is bosss updated information
     * @param number $bossId : This is boss id
     */
    function updateboss($bossInfo, $bossnickname)
    {
        $this->db->where('nickname', $bossnickname);
        $this->db->update('boss', $bossInfo);

        return TRUE;
    }

    /**
     * This function is used to delete the boss information
     * @param number $bossId : This is boss id
     * @return boolean $result : TRUE / FALSE
     */
    function deleteboss($bossId, $bossInfo)
    {
        $this->db->where('bossId', $bossId);
        $this->db->update('boss', $bossInfo);

        return $this->db->affected_rows();
    }
}

/* End of file boss_model.php */
/* Location: .application/models/boss_model.php */
