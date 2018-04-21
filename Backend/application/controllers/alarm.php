<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

require APPPATH . '/libraries/basecontroller.php';


class Alarm extends basecontroller
{
    /**
     * This is default constructor of the class
     */
    public function __construct()
    {
        parent::__construct();
        $this->load->model('alarm_model');
        $this->isLoggedIn();
    }

    /**
     * This function used to load the first screen of the alarm
     */
    public function index()
    {

        $this->global['pageTitle'] = '系统信息';
        $count = $this->alarm_model->getAlarmCount();
        $returns = $this->paginationCompress("rating/", $count, 10);
        $data['alarmList'] = $this->alarm_model->getAlarm($returns['page'], $returns['segment']);
        $this->loadViews("alarm", $this->global, $data, NULL);
    }

    function readAlarm()
    {
        $id = $this->input->post('id');
        $result = $this->alarm_model->updateState($id);
        if ($result == true) {
            $this->session->set_flashdata('success', '该修成功.');
            echo(json_encode(array('status' => TRUE)));
        } else {
            $this->session->set_flashdata('error', '该修失败.');
            echo(json_encode(array('status' => FALSE)));
        }
    }

    /**
     * This function is used to delete alarm by id
     */
    function deletealarm()
    {
        $id = $this->input->post('id');
        $result = $this->alarm_model->deleteAlarm($id);
        if ($result == true) {
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

/* End of file alarm.php */
/* Location: .application/controllers/alarm.php */


?>