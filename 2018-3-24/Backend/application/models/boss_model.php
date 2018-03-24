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

    /**
     * This function is used to get the detailed information of site
     * @param number $bossId : This is boss id
     * @return array $result :  information of the site
     */
    function getSiteDetail($bossId)
    {
        $this->db->select("boss.site_address, boss.site_name, boss.site_introduction, boss.site_service,user.phone");
        $this->db->select("avg(rating.point) as point, count(rating.id) as rating_amount");
        $this->db->from("boss");
        $this->db->join("user", "user.no = boss.boss_id");
        $this->db->join("rating", "rating.boss_id = boss.boss_id");
        $this->db->where("boss.boss_id", $bossId);
        $query = $this->db->get();
        return $query->result();
    }

    /**
     *This function is used to get the state of which the site is in the list of favourite sites of the current user
     *@param number $userId : This is the id of current user
     *@param number $bossId : This is the id of boss of the wanted site
     *@return boolean $result : state of the site 
     */
    function isFavourite($userId, $bossId)
    {
        $this->db->select("no");
        $this->db->from("favourite");
        $this->db->where("user_id", $userId);
        $this->db->where("boss_id", $bossId);
        $query = $this->db->get();
        $result = $query->result();
        return (count($result)>0)?true:false;
    }

    /**
     * This function is used to get the pictures of the site
     * @param number $bossId : This is boss id
     * @return array $result : picture URL of the site
     */
    function getSitePictures($bossId)
    {
        $this->db->select("picture");
        $this->db->from("site_picture");
        $this->db->where("boss_id", $bossId);
        $query = $this->db->get();
        return $query->result();
    }

    /**
     * This function is used to get status of the site
     * @param number $bossId : This is boss id
     * @return boolean $result : status of inputing information
     */
    function getSiteStatus($bossId)
    {
        $this->db->select("site_icon");
        $this->db->from("boss");
        $this->db->where("boss_id", $bossId);
        $query = $this->db->get();
        $result = $query->result();
        return (count($result)>0)?true:false;
    }

    /**
     * This function is used to add information of the site
     * @param number $bossId : This is boss id
     * @param array $info: This is the array of information 
     * @return boolean $result : status of inputing information
     */
    function addSiteInfo($bossId, $info)
    {
        $this->db->where("boss_id", $bossId);
        $this->db->update("boss", $info);
        $result = $this->db->affected_rows();
        return (count($result)>0)?true:false;
    }

    function addSitePicture($bossId, $picture)
    {
        $info['boss_id'] = $bossId;
        for($index = 0 ; $index < count($picture); $index++)
        {
            $info['pic_index'] = $index;
            $info['picture'] = $picture[$index];
            $this->db->insert('site_picture', $info);
        }
        $result = $this->db->affected_rows();
        return (count($result)>0)?true:false;
    }

    /**
     * This function is used to change the pictures of the site
     * @param number $bossId : This is boss id
     * @param array $picture: This is the array of pictures
     * @return boolean $result : status of inputing information
     */
    function addSitePicture($bossId, $picture)
    {
        $this->db->where("boss_id", $bossId);
        $this->db->delete("site_picture");
        $this->db->affected_rows();
        $info['boss_id'] = $bossId;
        for($index = 0 ; $index < count($picture); $index++)
        {
            $info['pic_index'] = $index;
            $info['picture'] = $picture[$index];
            $this->db->insert('site_picture', $info);
        }
        $result = $this->db->affected_rows();
        return (count($result)>0)?true:false;
    }
}

/* End of file boss_model.php */
/* Location: .application/models/boss_model.php */
