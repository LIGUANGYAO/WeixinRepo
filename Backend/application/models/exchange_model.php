<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class exchange_model extends CI_Model
{
    /**
     * This function is used to get the exchange 
     * @param number $userId : This is id of exchange
     * @return number $count : This is row count
     */
    function getStateById($userId)
    {
        $this->db->select("date(expire_time)>=current_date() as state");
        $this->db->from('exchange');
        $this->db->where('user_id', $userId);
        $this->db->order_by('date(expire_time)','DESC');
        $this->db->limit(1);
        $query = $this->db->get();
        return $query->result();
    }

    /**
     * This function is used to get the exchange 
     * @param number $userId : This is id of exchange
     * @return number $count : This is row count
     */
    function getExchangeDetailById($exchangeId)
    {
        $this->db->select("goods.name as good_name,goods.cost");
        $this->db->select("accept_address.name, accept_address.phone, accept_address.address, accept_address.email, accept_address.state as address_state");
        $this->db->select("exchange.*");
        $this->db->from('exchange');
        $this->db->join('goods','goods.id = exchange.good_id');
        $this->db->join('accept_address','exchange.user_id = accept_address.user_id');
        $this->db->where('exchange.no', $exchangeId);
        $this->db->where('accept_address.state', 1);
        $query = $this->db->get();
        return $query->result();
    }

    function getExchangeInfo($userId)
    {
        $this->db->select("*");
        $this->db->select("date(expire_time)>=current_date() as state");
        $query = $this->db->get();
        return $query->result();
    }

    /**
     * This function is used to get the exchange listing count
     * @param string $searchText : This is optional search text
     * @return number $count : This is row count
     */
    function exchangeListingCount($searchStatus = null , $searchText = '', $searchState)
    {
        $query = "select exchange.no, exchange.state, exchange.submit_time,
                    user.name, user.phone,
                    goods.name as good_name, goods.cost
                    from exchange, `user`, goods 
                    where exchange.user_id = user.no and exchange.good_id = goods.id";
        if($searchState != 10){
            $query = $query . " and exchange.state like '%" . $searchState ."%'";
        }
        if (!empty($searchText)) {
            if(isset($searchStatus)){
                if ($searchStatus == '0') {
                    $query = $query." and (exchange.no LIKE '%" . $searchText . "%')";
                } else if ($searchStatus == '1') {
                    $query = $query." and (user.name LIKE '%" . $searchText . "%')";
                } else {
                    $query = $query." and (user.phone LIKE '%" . $searchText . "%')";
                }
            }
        }
        $result = $this->db->query($query);

        return count($result->result());
    }

    /**
     * This function is used to get the exchange listing count
     * @param string $searchText : This is optional search text
     * @return number $count : This is row count
     */
    function exchangeListing($searchStatus = null , $searchText = '', $searchState, $page, $segment)
    {
        $query = "select exchange.no, exchange.state, exchange.submit_time,
                    user.name, user.phone,
                    goods.name as good_name, goods.cost
                    from exchange, user, goods 
                    where exchange.user_id = user.no and exchange.good_id = goods.id";
        if($searchState != 10){
            $query = $query . " and exchange.state LIKE '%" . $searchState ."%'";
        }
        if (!empty($searchText)) {
            if(isset($searchStatus)){
                if ($searchStatus == '0') {
                    $query = $query." and (exchange.no LIKE '%" . $searchText . "%')";
                } else if ($searchStatus == '1') {
                    $query = $query." and (user.name LIKE '%" . $searchText . "%')";
                } else {
                    $query = $query." and (user.phone LIKE '%" . $searchText . "%')";
                }
            }
        }
        $this->db->limit($page, $segment);
        $result = $this->db->query($query);

        return $result->result();
    }

    /**
     * This function is used to update the exchange state
     * @param string $exchangeId : This is id of exchange
     *@param array $info: this is the information of exchange
     * @return number $count : This is row count
     */
    function updateStateById($exchangeId , $info)
    {
        $this->db->where("no", $exchangeId);
        $this->db->update("exchange", $info);
        $result = $this->db->affected_rows();
        return $result;
    }

    /**
     * This function is used to add exchange
     *@param array $info: this is the information of exchange
     * @return number $count : This is row count
     */
    function addExchange($info)
    {
        $this->db->insert("exchange", $info);
        $result = $this->db->affected_rows();
        return $result;
    }

    /**
     * This function is used to get all information of exchange
     *@param number $userId: this is the id of current user
     * @return array $result : This is information array of exchange found
     */
    function getExchange($userId)
    {
        $this->db->select("exchange.no, exchange.state");
        $this->db->select("goods.avatar, goods.cost, goods.name");
        $this->db->from("exchange, goods");
        $this->db->where("exchange.user_id", $userId);
        $this->db->where("goods.id = exchange.good_id");
        $result = $this->db->get()->result();
        return $result;
    }

    /**
     * This function is used to get detail information of exchange
     *@param array $exchangeId: this is the id of exchange
     * @return array $result : This is information of exchange
     */
    function getExchangeDetail($exchangeId, $userId)
    {
        $this->db->select("exchange.*");
        $this->db->select("goods.avatar, goods.cost, goods.name");
        $this->db->select("accept_address.name as address_name, accept_address.phone, accept_address.address");
        $this->db->from("exchange, goods, accept_address");
        $this->db->where("exchange.no", $exchangeId);
        $this->db->where("goods.id = exchange.good_id");
        $this->db->where("accept_address.user_id", $userId);
        $this->db->where("accept_address.state", 1);
        $result = $this->db->get()->result();
        return $result;
    }
}

/* End of file exchange_model.php */
/* Location: .application/models/exchange_model.php */
