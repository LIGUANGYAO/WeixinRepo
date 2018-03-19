<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

require APPPATH . '/libraries/BaseController.php';

/**
 * Class : Shop (ShopController)
 * Area Class to control all shop related operations.
 * @author : The jin hu
 * @version : 1.0
 * @since : 12 August 2017
 */
class usermanage extends BaseController
{
    /**
     * This is default constructor of the class
     */
    public function __construct()
    {
        parent::__construct();
        $this->load->model('user_model');
        $this->isLoggedIn();
    }

    /**
     * This function used to load the first screen of the user
     */
    public function index()
    {
        $this->userCollectListing(null, '');
    }

    /**
     * This function is used to load the user list
     */
    function userCollectListing($searchType = null, $searchName = '', $searchRole = 10, $searchStatus = 10, $searchForbidden = 10)
    {
        $this->global['pageTitle'] = '用户管理';
        if ($searchName == 'ALL') $searchName = '';
        $count = $this->user_model->userListingCount($searchType, $searchName, $searchRole, $searchStatus, $searchForbidden);
        $returns = $this->paginationCompress("usermanage/", $count, 10);
         $data['userList'] = $this->user_model->userListing($searchType, $searchName, $searchRole, $searchStatus, $searchForbidden, $returns['page'], $returns['segment']);
        $this->global['searchStatus'] = $searchType;
        $this->global['searchText'] = $searchName;
        $this->global['searchRole'] = $searchRole;
        $this->global['searchState'] = $searchStatus;
        $this->global['searchForbidden'] = $searchForbidden;
        $this->global['pageType'] = 'user';
        $this->loadViews("usermanage", $this->global, $data, NULL);
    }

    /**
     * This function is used to load the user list by search
     */
    function userListingByFilter()
    {
        $searchType = $this->input->post('searchStatus');
        $searchName = $this->input->post('searchName');
        $searchRole = $this->input->post('searchRole');
        $searchState = $this->input->post('searchState');
        $searchForbidden = $this->input->post('searchForbidden');
        $this->userCollectListing($searchType, $searchName, $searchRole, $searchState, $searchForbidden);
    }

    /**
     * This function is used to load the user list by search
     */
    function updateUserState()
    {
        $userId = $this->input->post('userId');
        $state = $this->input->post('state');
        $userInfo = array('state' => $state);
        $result = $this->user_model->updateStateById($userId, $userInfo);
        if ($result > 0) {
            $this->session->set_flashdata('success', '修改密码成功.');
            echo(json_encode(array('status' => TRUE)));
        } else {
            $this->session->set_flashdata('error', '修改密码失败.');
            echo(json_encode(array('status' => FALSE)));
        }
    }

    function addNewUser()
    {
        $now = time();
        $info['reg_time'] = mdate("%Y-%m-%d %h:%i:%a", $now);
        $info['role'] = $this->input->post('role');
        $info['name'] = $this->input->post('name');
        $info['phone'] = $this->input->post('phone');
        $userId = $this->user_model->addNewUser($info);
        if($info['role'] == 1)
        {
            $boss['site_name'] = $this->input->post('site_name');
            $boss['allow_pic'] = $this->input->post('allow_pic');
            $boss['id_no'] = $this->input->post('id_no');
            $boss['id_pic1'] = $this->input->post('id_pic1');
            $boss['id_pic2'] = $this->input->post('id_pic2');
            $boss['site_address'] = $this->input->post('address1') .$this->input->post('address2')
            .$this->input->post('address3').$this->input->post('address4');
            $boss['boss_id'] = $userId;
            $this->load->model('boss_model');
            $this->boss_model->addNewBoss($boss);
        }
        if ($userId != null) {
            $this->session->set_flashdata('success', '新增成功.');
            echo(json_encode(array('status' => TRUE, 'registration' => false)));
        } else {
            $this->session->set_flashdata('error', '新增失败.');
            echo(json_encode(array('status' => FALSE, 'registration' => false)));
        }
    }


/**
     * This function is used to change the forbidden with userId
     */
    function changeForbidden()
    {
        $userId = $this->input->post('userId');
        $result = $this->user_model->getForbiddenById($userId);
        $forbidden = $result[0]->forbidden;
        $forbidden = ($forbidden + 1) % 2;
        $this->user_model->updateForbiddenById($userId, $forbidden);
        if ($result > 0) {
            $this->session->set_flashdata('success', '修改密码成功.');
            echo(json_encode(array('status' => TRUE)));
        } else {
            $this->session->set_flashdata('error', '修改密码失败.');
            echo(json_encode(array('status' => FALSE)));
        }
}
/**
     * This function is used to show the detail of user with userId
     */
    function showUserDetail($userId)
    {
        $data['userDetail'] = $this->user_model->getUserDetailById($userId);
        $this->global['pageTitle'] = '用户详情';
        $this->loadViews("userdetail", $this->global, $data, NULL);
    }

    function pageNotFound()
    {
        $this->global['pageTitle'] = '蜂体 : 404 - Page Not Found';

        $this->loadViews("404", $this->global, NULL, NULL);
    }
}

/* End of file usermanage.php */
/* Location: .application/controllers/usermanage.php */


?>