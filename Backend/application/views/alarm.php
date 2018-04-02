<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <h1>
            信息列表
        </h1>
    </section>
    <section class="content" style="min-height: 800px;">
        <div class="container">
            <div class="row">
                <div class="col-xs-12">
                        <div class="col-xs-12 col-sm-1 form-inline">
                            <div class="form-group area-search-control-view">
                                <button class="btn btn-primary searchList"
                                        onclick="">删除
                                </button>
                            </div>
                        </div>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <table class="table area-result-view table-bordered table-hover">
                        <thead>
                        <tr style="background-color: lightslategrey;">
                            <th width=""><input id="selectAll" type="checkbox" value="0"/>全选</th>
                            <th>序号</th>
                            <th>信息类型</th>
                            <th>信息内容</th>
                            <th>状态</th>
                            <th>发起日期</th>
                            <th width="">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                       <?php
                        $alarmType = ['提现','兑换','申请'];
                        $alarmContent = [
                            '发起了提现申请',
                            '',
                            '发起了身份认证'
                        ];
                        if (!empty($alarmList)) {
                            foreach ($alarmList as $record) {
                                $index = 1;
                                ?>
                                <tr>
                                    <td><input class="alarm-select" type="checkbox" value/></td>
                                    <td><?php echo $index; ?></td>
                                    <td><?php echo $alarmType[$record->type]; ?></td>
                                    <td>
                                        <?php
                                            echo $record->name.$alarmContent[$record->type];
                                        ?>
                                    </td>
                                    <td><?php echo ($record->state==1)?'已读':'未读'; ?></td>
                                    <td><?php echo $record->time; ?></td>
                                    <td class="text-center">
                                        <?php 
                                            if($record->state==0){
                                        ?>
                                        <a onclick="readAlarm('<?php echo $record->no;?>','<?php echo base_url();?>')">
                                            阅读 &nbsp;
                                        </a>
                                        <?php
                                            }
                                        ?>
                                    </td>
                                </tr>
                               <?php
                               $index++;
                            }
                        }
                        ?>
                        </tbody>
                    </table>
                    <div class="clearfix">
                       <?php echo $this->pagination->create_links(); ?>
                    </div>
                    <div class="form-group">
                        <div id="custom-confirm-delete-view" style="display:none;">
                            <div class="form-group">
                                <label>确定删除？</label>
                            </div>
                            <div class="form-group">
                                <button class="btn btn-default" onclick="$('#custom-confirm-delete-view').hide();">取消</button>
                                <button class="btn btn-primary" onclick="deleteUser('<?php echo base_url(); ?>');">确定</button>
                                <div id="alarmId" style="display: none;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/common.js" charset="utf-8"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/alarm.js" charset="utf-8"></script>
</script>
