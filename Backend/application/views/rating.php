<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <h1>
            提现列表
        </h1>
    </section>
    <section class="content" style="min-height: 800px;">
        <div class="container">
            <div class="row">
                <div class="col-xs-12">
                    <form action="<?php echo base_url(); ?>ratingListingByFilter" method="POST" id="searchList">
                        <div class="col-xs-12 col-sm-4 form-inline">
                            <div class="form-group">
                                <select class="form-control" id="searchStatus" name="searchStatus">
                                    <option value="0"<?php if ($searchStatus == 0) echo ' selected'; ?>>认证手机号</option>
                                    <option value="1"<?php if ($searchStatus == 1) echo ' selected'; ?>>申请人</option>
                                    <option value="2"<?php if ($searchStatus == 2) echo ' selected'; ?>>持卡人</option>
                                </select>
                            </div>
                            <div class="input-group">
                                <input type="text" id="searchName" name="searchName"
                                       value="<?php echo $searchText == 'all' ? '' : $searchText; ?>"
                                       class="form-control"/>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-6 form-inline">
                            <div class="form-group area-search-control-view">
                                <button class="btn btn-primary searchList"
                                        onclick="">查询
                                </button>
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
                            <th>订单编码</th>
                            <th>姓名</th>
                            <th>手机号码</th>
                            <th>评分</th>
                            <th style="width: 60vw;">评分内容</th>
                            <th width="">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                       <?php
                        if (!empty($ratingList)) {
                            foreach ($ratingList as $record) {
                                ?>
                                <tr>
                                    <td><?php echo $record->id; ?></td>
                                    <td><?php echo $record->name; ?></td>
                                    <td><?php echo $record->phone; ?></td>
                                    <td><?php echo $record->point; ?></td>
                                    <td><?php echo $record->comment; ?></td>
                                    <td class="text-center">
                                        <a href="<?php echo base_url().'bookingDetail/'.$record->id; ?>">
                                            查看 &nbsp;
                                        </a>
                                        <a onclick="confirmDelete('<?php echo $record->ratingId;?>')">
                                            删除 &nbsp;
                                        </a>
                                    </td>
                                </tr>
                               <?php
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
                                <div id="ratingId" style="display: none;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/common.js" charset="utf-8"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/rating.js" charset="utf-8"></script>
</script>
