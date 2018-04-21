<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <h1>
            蜂约订单
        </h1>
        <input id="pageTitle" value="<?php echo $pageTitle ?>" type="hidden">
    </section>
    <section class="content" style="min-height: 800px;">
        <div class="container">
            <div class="row">
                <div class="col-xs-12">
                    <form action="<?php echo base_url(); ?>index.php/bookingListingByFilter" method="POST" id="searchList">
                        <div class="col-xs-2 col-sm-4 form-inline">
                            <div class="form-group">
                                <select class="form-control" id="searchStatus" name="searchStatus">
                                    <option value="0"<?php if ($searchStatus == 0) echo ' selected'; ?>>订单编号</option>
                                    <option value="1"<?php if ($searchStatus == 1) echo ' selected'; ?>>姓名</option>
                                    <option value="2"<?php if ($searchStatus == 2) echo ' selected'; ?>>手机号码</option>
                                    <option value="3"<?php if ($searchStatus == 3) echo ' selected'; ?>>活动名称</option>
                                </select>
                            </div>
                            <div class="input-group">
                                <input type="text" id="searchName" name="searchName"
                                       value="<?php echo $searchText == 'all' ? '' : $searchText; ?>"
                                       class="form-control"/>
                            </div>
                        </div>
                        <div class="col-xs-2 col-sm-1 form-inline">
                            <div class="form-group">
                                <select class="form-control" id="searchType" name="searchType">
                                    <option value="100"<?php if ($searchType == 100) echo ' selected'; ?>>活动类型</option>
                                   <?php
                                        foreach($eventType as $eventName){
                                    ?>
                                    <option value="<?php echo $eventName->no; ?>"<?php if ($searchType == $eventName->no) echo ' selected'; ?>><?php echo $eventName->name; ?></option>
                                   <?php
                                        }
                                    ?>
                                </select>
                            </div>
                        </div>
                        <div class="col-xs-2 col-sm-1 form-inline">
                            <div class="form-group">
                                <select class="form-control" id="searchState" name="searchState">
                                    <option value="10"<?php if ($searchState == 10) echo ' selected'; ?>>活动状态</option>
                                    <option value="0"<?php if ($searchState == 0) echo ' selected'; ?>>进行中</option>
                                    <option value="1"<?php if ($searchState == 1) echo ' selected'; ?>>已进行</option>
                                    <option value="2"<?php if ($searchState == 2) echo ' selected'; ?>>已取消</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-xs-2 col-sm-1 form-inline">
                            <div class="form-group">
                                <select class="form-control" id="searchPay" name="searchPay">
                                    <option value="10"<?php if ($searchPay == 10) echo ' selected'; ?>>支付方式</option>
                                    <option value="0"<?php if ($searchPay == 0) echo ' selected'; ?>>线上支付</option>
                                    <option value="1"<?php if ($searchPay == 1) echo ' selected'; ?>>线下支付</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-1 form-inline">
                            <div class="form-group area-search-control-view">
                                <input type="button" class="btn btn-primary searchList"
                                        onclick="exportTable()" value="导出">
                                </input>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-1 form-inline">
                            <div class="form-group area-search-control-view">
                                <input type="submit" class="btn btn-primary searchList" value="查询">
                                </input>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <table class="table area-result-view table-bordered table-hover">
                        <thead>
                        <tr style="background-color: lightslategrey;">
                            <th width="">订单编号</th>
                            <th>姓名</th>
                            <th>手机号码</th>
                            <th>报名人数</th>
                            <th>支付方式</th>
                            <th width="">金额</th>
                            <th>活动名称</th>
                            <th>活动类型</th>
                            <th>发起人</th>
                            <th>订单状态</th>
                            <th>提交时间</th>
                            <th width="">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                       <?php
                        if (!empty($creation_name)) {
                            $pay = ['线上支付','线下支付'];
                            $bookingState = ['进行中', '已进行', '已取消'];
                            foreach ($bookingList as $record) {
                                ?>
                                <tr>
                                    <td><?php echo $record->id; ?></td>
                                    <td><?php echo $record->name; ?></td>
                                    <td><?php echo $record->phone; ?></td>
                                    <td><?php echo $record->reg_num; ?></td>
                                    <td><?php echo $pay[$record->pay_type]; ?></td>
                                    <td><?php echo ($record->reg_num * $record->cost); ?></td>
                                    <td><?php echo $record->event_name; ?></td>
                                    <td><?php echo $eventType[$record->type]->name ?></td>
                                    <td><?php echo current($creation_name)->creation_name; ?></td>
                                    <td><?php echo $bookingState[$record->state]; ?></td>
                                    <td><?php echo $record->submit_time; ?></td>
                                    <td class="text-center">
                                        <a href="<?php echo base_url().'bookingDetail/'.$record->id; ?>">
                                            查看 &nbsp;
                                        </a>
                                    </td>
                                </tr>
                               <?php
                                next($creation_name);
                            }
                        }
                        ?>
                        </tbody>
                    </table>
                    <div class="clearfix">
                       <?php echo $this->pagination->create_links(); ?>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
<script type="text/javascript" src="<?php echo base_url(); ?>index.php/assets/js/common.js" charset="utf-8"></script>
</script>
