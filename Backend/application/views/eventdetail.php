<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <h1>
            活动详情
        </h1>
    </section>
    <section class="content">
        <div class="container">
            <div class="row custom-info-row">
                <img class="col-sm-4" id="avatar" src="<?php echo $eventDetail[0]->pic;?>"/>
            </div>
            <div class="row custom-info-row">
                <label class="col-sm-2">活动名称:</label>
                <label class="col-sm-4" id="nickname"><?php echo $eventDetail[0]->eventName; ?></label>
            </div>
            <div class="row custom-info-row">
                <label class="col-sm-2">活动类型:</label>
                <label class="col-sm-4" id="nickname"><?php echo $eventType[$eventDetail[0]->type]->name; ?></label>
            </div>
            <div class="row custom-info-row">
                <label class="col-sm-2">人数上限:</label>
                <label class="col-sm-4" id="nickname">不超过<?php echo $eventDetail[0]->limit; ?>人</label>
            </div>
            <div class="row custom-info-row">
                <label class="col-sm-2">活动费用:</label>
                <label class="col-sm-4" id="nickname"><?php echo $eventDetail[0]->cost; ?>元/人</label>
            </div>
            <div class="row custom-info-row">
                <label class="col-sm-2">活动时间:</label>
                <label class="col-sm-4" id="nickname"><?php echo $eventDetail[0]->start_time."-".$eventDetail[0]->end_time; ?></label>
            </div>
            <div class="row custom-info-row">
                <label class="col-sm-2">活动地址:</label>
                <label class="col-sm-4" id="site_name"><?php echo $eventDetail[0]->address1.$eventDetail[0]->address2.$eventDetail[0]->address3.$eventDetail[0]->address4; ?></label>
            </div>
            <?php
                if($eventDetail[0]->role == 2){
            ?>
            <div id="tip" class="row custom-info-row">
                <label class="col-sm-2"> 发起人:</label>
                <label class="col-sm-4" id="forbidden"><?php echo $eventDetail[0]->name; ?></label>
            </div>
            <div class="row custom-info-row">
                <label class="col-sm-2">联系方式:</label>
                <label class="col-sm-4" id="allow_pic"><?php echo $eventDetail[0]->phone; ?></label>
            </div>
            <div class="row custom-info-row">
                <label class="col-sm-2"> 附加条件:</label>
                <label class="col-sm-4" id="honey">
                    活动结束后是否在地图上生成能量？</br>
                    <?php 
                    if($eventDetail[0]->additional==1)
                    {
                        echo "是 ";
                        if(count($member_state) > 0){
                            if($member_state[0]->state == 1)
                            {
                                echo "(会员不需要花费蜂蜜)";
                            }
                        }
                        else
                        {
                            echo "(需花费500ml蜂蜜)";
                        }
                    }
                    else
                    {
                        echo "不是";
                    }
                    ?>
                </label>
            </div>
            <?php
                }else{
            ?>
            <div class="row custom-info-row">
                <label class="col-sm-2">场馆名称:</label>
                <label class="col-sm-4" id="phone"><?php echo $eventDetail[0]->site_name; ?></label>
            </div>
            <div class="row custom-info-row">
                <label class="col-sm-2">馆主名称:</label>
                <label class="col-sm-4" id="site_address"><?php echo $eventDetail[0]->name; ?></label>
            </div>
            <div class="row custom-info-row">
                <label class="col-sm-2">联系方式:</label>
                <label class="col-sm-4" id="allow_pic"><?php echo $eventDetail[0]->phone; ?></label>
            </div>
            <?php
                }
            ?>
            <div class="row custom-info-row">
                <label class="col-sm-2">活动简介:</label>
            </div>

            <div class="row custom-info-row">
                <label class="col-sm-4" id="nickname"><?php echo $eventDetail[0]->comment; ?></label>
            </div>

            <div class="row custom-info-row">
                <label class="col-sm-2">点赞数:</label>
                <label class="col-sm-4" id="nickname"><?php echo $eventDetail[0]->rating; ?></label>
            </div>
            <div class="row custom-info-row">
                <label class="col-sm-2">报名人数:</label>
                <label class="col-sm-4" id="nickname">  <?php echo (count($booking)>0)?$booking_amount[0]->amount."人":"无"; ?></label>
            </div>
            <div class="row custom-info-row">
                <div class="col-sm-4">
                    <table class="table table-bordered area-result-view">
                        <thead>
                        <tr style="background-color: lightslategrey;">
                            <th></th>
                            <th>姓名</th>
                            <th>联系方式</th>
                            <th>报名人数</th>
                            <th>支付方式</th>
                        </tr>
                        </thead>
                        <tbody id="content_tbl">
                        <?php 
                            if(count($booking) > 0){
                                foreach($booking as $booking_element)
                                {
                                    echo "<tr>";
                                    echo "<td>".$booking_element->avatar."</td>";
                                    echo "<td>".$booking_element->nickname."</td>";
                                    echo "<td>".$booking_element->phone."</td>";
                                    echo "<td>".$booking_element->reg_num."</td>";
                                    echo "<td>".$booking_element->pay_type."</td>";
                                    echo "</tr>";
                                }
                            }
                        ?>
                        </tbody>
                    </table>
                    <div class="clearfix"></div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-sm-offset-2 custom-course-control-view">
                    <input type="button" class="btn btn-primary" onclick="location.href=baseURL+'eventmanage';"
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