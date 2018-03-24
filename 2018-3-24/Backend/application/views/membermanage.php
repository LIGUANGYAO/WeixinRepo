<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <h1>
            用户列表
        </h1>
    </section>
    <section class="content" style="min-height: 800px;">
        <div class="container">
            <div class="row">
                <div class="col-xs-12">
                    <form action="<?php echo base_url(); ?>memberListingByFilter" method="POST" id="searchList">
                        <div class="col-xs-12 col-sm-3 form-inline">
                            <div class="form-group">
                                <select class="form-control" id="searchStatus" name="searchStatus">
                                    <option value="0"<?php if ($searchStatus == 0) echo ' selected'; ?>>订单编号</option>
                                    <option value="1"<?php if ($searchStatus == 1) echo ' selected'; ?>>姓名</option>
                                    <option value="2"<?php if ($searchStatus == 2) echo ' selected'; ?>>手机号码</option>
                                </select>
                            </div>
                            <div class="input-group">
                                <input type="text" id="searchName" name="searchName"
                                       value="<?php echo $searchText == 'all' ? '' : $searchText; ?>"
                                       class="form-control"/>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-1 form-inline">
                            <div class="form-group">
                                <select class="form-control" id="searchState" name="searchState">
                                    <option value="10"<?php if ($searchState == 10) echo ' selected'; ?>>认证状态</option>
                                    <option value="1"<?php if ($searchState == 1) echo ' selected'; ?>>使用中</option>
                                    <option value="2"<?php if ($searchState == 2) echo ' selected'; ?>>已过期</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-1 form-inline">
                            <div class="form-group area-search-control-view">
                                <button class="btn btn-primary searchList"
                                        onclick="exportTable();">导出
                                </button>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-1 form-inline">
                            <div class="form-group area-search-control-view">
                                <button class="btn btn-primary searchList"
                                        onclick="searchArea('<?php echo base_url(); ?>');">查询
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
                            <th width="">订单编号</th>
                            <th>姓名</th>
                            <th>手机号码</th>
                            <th>金额</th>
                            <th>订单状态</th>
                            <th width="">到期时间</th>
                            <th>提交时间</th>
                        </tr>
                        </thead>
                        <tbody>
                       <?php
                        if (!empty($memberList)) {
                            $i = 0;
                            foreach ($memberList as $record) {
                                ?>
                                <tr>
                                    <td><?php echo $record->no; ?></td>
                                    <td><?php echo $record->name; ?></td>
                                    <td><?php echo $record->phone; ?></td>
                                    <td><?php echo $record->cost; ?></td>
                                    <td><?php echo ($record->state==1)?"使用中":"已过期"; ?></td>
                                    <td><?php echo $record->expire_time; ?></td>
                                    <td><?php echo $record->submit_time; ?></td>
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
                </div>
            </div>
        </div>
    </section>
</div>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/common.js" charset="utf-8"></script>
</script>
