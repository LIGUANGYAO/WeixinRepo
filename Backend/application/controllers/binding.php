<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

require APPPATH . '/libraries/basecontroller.php';

/**
 * Class : Shop (ShopController)
 * Area Class to control all shop related operations.
 * @author : The jin hu
 * @version : 1.0
 * @since : 12 August 2017
 */
class Binding extends basecontroller
{
    /**
     * This is default constructor of the class
     */
    public function __construct()
    {
        parent::__construct();
        $this->load->model('binding_model');
        $this->load->model("goods_model");
        $this->isLoggedIn();
    }

    /**
     * This function used to load the first screen of the binding
     */
    public function index()
    {
        $this->bindingCollectListing();
    }

    /**
     * This function is used to load the binding list
     */
    function bindingCollectListing($searchType = null, $searchName = '', $searchStatus = 10)
    {
        $this->global['pageTitle'] = '提现管理';
        $count = $this->binding_model->bindingListingCount($searchType, $searchName, $searchStatus);
        $returns = $this->paginationCompress("binding/", $count, 10);
        $data['bindingList'] = $this->binding_model->bindingListing($searchType, $searchName, $searchStatus, $returns['page'], $returns['segment']);
        $this->global['searchStatus'] = $searchType;
        $this->global['searchText'] = $searchName;
        $this->global['searchState'] = $searchStatus;
        $this->global['pageType'] = 'binding';
        $this->loadViews("bindingmanage", $this->global, $data, NULL);
    }

    /**
     * This function is used to load the binding list by search
     */
    function bindingListingByFilter()
    {
        $searchType = $this->input->post('searchStatus');
        $searchName = $this->input->post('searchName');
        $searchState = $this->input->post('searchState');
        $this->bindingCollectListing($searchType, $searchName, $searchState);
    }

    /**
     * This function is used to show the detail of binding with bindingId
     */
    function showbindingDetail($bindingId)
    {
        $data['bindingDetail'] = $this->binding_model->getBindingDetailById($bindingId);
        $this->global['pageTitle'] = '提现详情';
        $this->loadViews("bindingdetail", $this->global, $data, NULL);
    }

    /**
    * This function is used to show the confirm of the binding
    */
    function bindingShowConfirm($bindingId)
    {
        $data['bindingDetail'] = $this->binding_model->getBindingDetailById($bindingId);
        $this->global['pageTitle'] = '打款';
        $this->loadViews("bindingconfirm", $this->global, $data, NULL);
    }

    /**
    * This function is used to update the state of binding
    */
    function bindingConfirmed()
    {
        $this->load->library('form_validation');

        $this->form_validation->set_rules('note', '备注', 'trim|required|max_length[100]');

        $bindingId = $this->input->post('binding_id');
        $info['comment'] = $this->input->post('comment');
        $info['state'] = $this->input->post('option_status');
        $info['binding_time'] = date("Y-m-d h:i:a");
        $info['binding_man'] = $this->session->userdata('userId');
        $result = $this->binding_model->updateStateById($bindingId, $info);
        if($result){
            $this->bindingCollectListing();
        }
        else
        {
            echo "error";
        }
    }

    function pageNotFound()
    {
        $this->global['pageTitle'] = '蜂体 : 404 - Page Not Found';

        $this->loadViews("404", $this->global, NULL, NULL);
    }
}

/* End of file binding.php */
/* Location: .application/controllers/binding.php */


?>