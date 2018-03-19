<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

require APPPATH . '/libraries/BaseController.php';

/**
 * Class : Shop (ShopController)
 * Area Class to control all shop related operations.
 * @author : The jin hu
 * @version : 1.0
 * @since : 12 August 2017
 */
class goodsmanage extends BaseController
{
    /**
     * This is default constructor of the class
     */
    public function __construct()
    {
        parent::__construct();
        $this->load->model('goods_model');
        $this->isLoggedIn();
    }

    /**
     * This function used to load the first screen of the goods
     */
    public function index()
    {
        $this->goodsCollectListing();
    }

    /**
     * This function is used to load the goods list
     */
    function goodsCollectListing($searchName = '', $searchStatus = 10)
    {
        $this->global['pageTitle'] = '商品管理';
        $count = $this->goods_model->goodsListingCount($searchName, $searchStatus);
        $returns = $this->paginationCompress("goodsmanage/", $count, 10);
        $data['goodsList'] = $this->goods_model->goodsListing($searchName, $searchStatus, $returns['page'], $returns['segment']);
        $this->global['searchText'] = $searchName;
        $this->global['searchState'] = $searchStatus;
        $this->global['pageType'] = 'goods';
        $this->loadViews("goodsmanage", $this->global, $data, NULL);
    }

    /**
     * This function is used to load the goods list by search
     */
    function goodsListingByFilter()
    {
        $searchName = $this->input->post('searchName');
        $searchState = $this->input->post('searchState');
        $this->goodsCollectListing($searchName, $searchState);
    }

     /**
     * This function is used to load the goods list by search
     */
    function deleteGood()
    {
        $goodId = $this->input->post('goodId');
        $result = $this->goods_model->deleteGood($goodId);
        if ($result) {
            $this->session->set_flashdata('success', '删除成功.');
            echo(json_encode(array('status' => TRUE)));
        } else {
            $this->session->set_flashdata('error', '删除失败.');
            echo(json_encode(array('status' => FALSE)));
        }
    }

    /**
     * This function is used to show the detail of goods with goodsId
     */
    function showGoodsDetail($goodsId)
    {
        $data['goodsDetail'] = $this->goods_model->getgoodsDetailById($goodsId);
        $this->global['pageTitle'] = '提现详情';
        $this->loadViews("goodsdetail", $this->global, $data, NULL);
    }

    /**
    * This function is used to change the state of the good
    */
    function goodsShowConfirm($goodsId)
    {
        $data['goodsDetail'] = $this->goods_model->getgoodsDetailById($goodsId);
        $this->global['pageTitle'] = '打款';
        $this->loadViews("goodsconfirm", $this->global, $data, NULL);
    }

    /**
    * This function is used to show the confirm of the goods
    */
    function changeState()
    {
       $id = $this->input->post('goodId');
       $state = $this->goods_model->getStateById($id);
       $info['state'] = ($state[0]->state+1) % 2;
       $result = $this->goods_model->updateGoods($id, $info);
       if ($result) {
            $this->session->set_flashdata('success', '删除成功.');
            echo(json_encode(array('status' => TRUE)));
        } else {
            $this->session->set_flashdata('error', '删除失败.');
            echo(json_encode(array('status' => FALSE)));
        }
    }

     /**
    * This function is used to add the amount of goods
    */
    function changeAmount()
    {
       $id = $this->input->post('goodId');
       $amount = $this->goods_model->getInfoById($id,"amount");
       $add = $this->input->post('amount');
       $info['amount'] = $amount[0]->amount + $add;
       $result = $this->goods_model->updateGoods($id, $info);
       if ($result) {
            $this->session->set_flashdata('success', '删除成功.');
            echo(json_encode(array('status' => TRUE)));
        } else {
            $this->session->set_flashdata('error', '删除失败.');
            echo(json_encode(array('status' => FALSE)));
        }
    }

    function pageNotFound()
    {
        $this->global['pageTitle'] = '蜂体 : 404 - Page Not Found';

        $this->loadViews("404", $this->global, NULL, NULL);
    }
}

/* End of file goods.php */
/* Location: .application/controllers/goods.php */


?>