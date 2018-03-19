<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <h1>
            用户详情
        </h1>
    </section>
    <?php 
        $userRole = ['无', '场馆主', '个人'];
        $userState = ['未认证', '认证中', '认证通过', '认证未通过'];
    ?>
    <section class="content">
        <div class="container">
            <div class="row custom-info-row">
                <label class="col-sm-2">头像:</label>
                <label class="col-sm-4" id="avatar"></label>
            </div>
            <div class="row custom-info-row">
                <label class="col-sm-2">昵称:</label>
                <label class="col-sm-4" id="nickname"><?php echo $userDetail[0]->nickname; ?></label>
            </div>
            <?php
                if($userDetail[0]->role == 2){
            ?>
            <div class="row custom-info-row">
                <label class="col-sm-2">真实姓名:</label>
                <label class="col-sm-4" id="nickname"><?php echo $userDetail[0]->name; ?></label>
            </div>
            <div class="row custom-info-row">
                <label class="col-sm-2">联系方式:</label>
                <label class="col-sm-4" id="nickname"><?php echo $userDetail[0]->phone; ?></label>
            </div>
            <?php
                }
            ?>
            <?php
                if($userDetail[0]->role == 1){
            ?>
            <div class="row custom-info-row">
                <label class="col-sm-2">场馆名称:</label>
                <label class="col-sm-4" id="nickname"><?php echo $userDetail[0]->site_name; ?></label>
            </div>
            <div class="row custom-info-row">
                <label class="col-sm-2">馆主姓名:</label>
                <label class="col-sm-4" id="site_name"><?php echo $userDetail[0]->name; ?></label>
            </div>
            <div class="row custom-info-row">
                <label class="col-sm-2">联系方式:</label>
                <label class="col-sm-4" id="phone"><?php echo $userDetail[0]->phone; ?></label>
            </div>
            <div class="row custom-info-row">
                <label class="col-sm-2">场馆地址:</label>
                <label class="col-sm-4" id="site_address"><?php echo $userDetail[0]->site_address; ?></label>
            </div>
            <div class="row custom-info-row">
                <label class="col-sm-2">营业执照照片:</label>
            </div>
            <div class="row custom-info-row">
                <label class="col-sm-4" id="allow_pic"><?php echo $userDetail[0]->allow_pic; ?></label>
            </div>
            <div class="row custom-info-row">
                <label class="col-sm-2">身份证号:</label>
                <label class="col-sm-4" id="nickname"><?php echo $userDetail[0]->id_no; ?></label>
            </div>

            <div class="row custom-info-row">
                <label class="col-sm-2">身份证照:</label>
            </div>
            <div class="row custom-info-row">
                <label class="col-sm-4" id="nickname"><?php echo $userDetail[0]->id_pic1; ?></label>
                <label class="col-sm-4" id="nickname"><?php echo $userDetail[0]->id_pic1; ?></label>
            </div>
            <?php
                }
            ?>
            <?php
                if($userDetail[0]->role != 0){
            ?>
            <div class="row custom-info-row">
                <label class="col-sm-2">认证角色:</label>
                <label class="col-sm-4" id="role"><?php echo $userRole[$userDetail[0]->role]; ?></label>
            </div>
            <?php
                }
            ?>
            <div id="tip" class="row custom-info-row">
                <label class="col-sm-2"> 认证状态:</label>
                <label class="col-sm-4" id="state"><?php echo $userState[$userDetail[0]->state]; ?></label>
            </div>
            <?php
                if($userDetail[0]->role != 0){
            ?>
            <div id="tip" class="row custom-info-row">
                <label class="col-sm-2"> 禁用状态:</label>
                <label class="col-sm-4" id="forbidden"><?php echo $userDetail[0]->forbidden?'已禁用':'未禁用'; ?></label>
            </div>
            <?php
                }
            ?>
            <div class="row custom-info-row">
                <label class="col-sm-2"> 现有蜂蜜量:</label>
                <label class="col-sm-4" id="honey">
                    <?php echo $userDetail[0]->honey."ml"; ?>
                </label>
            </div>
            <div class="row custom-info-row">
                <label class="col-sm-2">蜂蜜使用记录:</label>
                <div class="col-sm-4">
                    <table class="table table-bordered area-result-view">
                        <thead>
                        <tr style="background-color: lightslategrey;">
                            <th>用途</th>
                            <th>消耗蜂蜜</th>
                            <th>使用时间</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody id="content_tbl">
                       
                        </tbody>
                    </table>
                    <div class="clearfix"></div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-sm-offset-2 custom-course-control-view">
                    <input type="button" class="btn btn-primary" onclick="location.href=baseURL+'usermanage';"
                           value="返回"/>
                </div>
            </div>
        </div>
    </section>
</div>


<!-- Course Management JS-->
<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/shop.js" charset="utf-8"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/jquery.qrcode.js" charset="utf-8"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/qrcode.js" charset="utf-8"></script>