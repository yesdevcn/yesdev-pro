# 项目/需求/问题等变更通知推送

如果需要进行多系统之间的自动化流转，可以通过在YesDev配置变更回调通知地址Webhook，接收项目/需求/问题等变更通知推送。 

# 服务端Webhook配置

假设企业key为：```GCKJ```。  

新增配置文件：```./config/record_webhook_GCKJ.php```，编辑保存：  

```php
<?php
// 变更记录的回调通知地址
return [
    'webhook' => 'http://test.www.yesdev.cn/xxx',
];
```

> 温馨提示：需要使用前，请联系我们技术人员在服务端配置你系统的Webhook地址。  

# 变更推送

YesDev将会以POST请求的方式，将以下格式的报文推送到你的回调地址。  

## 请求方式
```
POST
```

## 请求头

```
Content-Type: application/x-www-form-urlencoded;
```

## 请求的参数格式

参数名|类型|说明|备注
---|---|---|---
module_type|整数|模块类型|1项目、2任务、3需求、4问题、100周报、101PRD、200文档、300测试用例、310测试计划、400工作组
module_type_id|整数|对应模块的ID|例如：项目ID、需求ID、问题ID等
record|JSON|变更记录，多组|

其中，record是JSON格式，存在多组的变更记录信息。示例：  

```
[
{
    "name":"刘xx",
    "date":"2023-07-21 15:56:04",
    "record_msg":"任务SOP与前端联调 任务状态从【待办】改为【进行中】"
}
]
```
每一组的变更记录结构体格式：  

参数名|类型|说明|备注
---|---|---|---
name|字符串|员工姓名|如：张三
date|日期时间|操作的日期时间|示例：2023-07-21 15:56:04
record_msg|字符串|变更说明内容|

## 请求参数示例

完整推送的数据示例：  
```
{
    "module_type":3,
    "module_type_id":628908,
    "record":"[{"name":"黄禅宗","date":"2023-07-21 16:21:14","record_msg":"数据拉取API 测试负责人从【】改为【dogstar】","record_msg_change":"dogstar"}]"
}
```

## 响应要求

对响应返回的结果和HTTP状态码无要求，但需要在5秒内响应，超时失败不重试。  

# 详情数据拉取API

根据变更推送的module_type和module_type_id，可以继续调用以下API接口拉取所需要的项目/需求/问题等详情数据。  

 + App.ModuleData.GetModuleDataDetail：获取模块数据详情接口 

## 拉取项目详情

> 温馨提示：```module_type=1```时，表示拉取项目详情，此时```module_type_id```对应项目ID。  

项目详情示例：
```json
{
    "ret": 200,
    "data": {
        "module_type": 1,
        "module_type_id": 102433,
        "detail": {
            "id": 102433,
            "project_name": "七月YesDev产品迭代",
            "admin_id": 2600,
            "project_type": 0,
            "project_start_time": "2023-07-04",
            "project_end_time": "2023-07-31",
            "project_product_id": 17,
            "project_desc": "<p>项目背景：</p><p><br/></p><p>项目文档：</p><p><br/></p>",
            "project_status": 1,
            "add_time": "2023-07-04 09:58:01",
            "app_key": "GCKJ",
            "charge_staff_id": 2598,
            "workgroup_id": 13,
            "top_time": 0,
            "sys_update_time": "2023-07-21 16:09:30",
            "created_staff_id": 2598,
            "refuse_delete": 0,
            "from_channel": "",
            "show_modules": "1_1,2_1,5_1,3_1,4_1,6_1,13_1,11_1,12_1,8_1,9_1,10_1,14_1,15_1,17_1,16_1,18_1,19_1,20_1,21_1,22_1,23_1,24_1,25_1,",
            "label_name_str": null,
            "show_modules_times": 0,
            "visit_times": 0,
            "redundancy_historical_update_version": 359,
            "redundancy_last_record_log": "[{\"name\":\"黄禅宗\",\"date\":\"2023-07-21 16:09:30\",\"record_msg\":\"更新了 需求#628908 的开发文档\"}]",
            "project_bg_color": "#673AB7",
            "auto_tidy_up": 1,
            "project_purpose_type": 0,
            "is_locking": 0,
            "auto_create_danger_problem": 0,
            "project_level_type": 1
        }
    },
    "msg": ""
}
```

## 拉取需求详情

> 温馨提示：```module_type=3```时，表示拉取需求详情，此时```module_type_id```对应需求ID。  

需求详情示例：
```json
{
    "ret": 200,
    "data": {
        "module_type": 3,
        "module_type_id": 628908,
        "detail": {
            "id": 628908,
            "need_name": "项目/需求/问题/任务变更通知订阅推送，以及数据拉取API",
            "need_check_status": 1,
            "need_status": 410,
            "product_category_id": 17,
            "product_category_version_id": 0,
            "need_from": "",
            "need_finish_date": "2023-07-28",
            "need_content": "<p>需求背景：</p><p>参考资料： <br/></p>",
            "document_content_type": 0,
            "need_note": "",
            "need_level": 1,
            "app_key": "GCKJ",
            "admin_id": 49,
            "add_time": "2023-07-21 14:31:36",
            "charge_staff_id": 45,
            "test_charge_staff_id": 13,
            "project_id": 102433,
            "prd_id": 0,
            "sys_update_time": "2023-07-21 17:38:07",
            "created_staff_id": 45,
            "refuse_delete": 0,
            "from_channel": "top_menu_in_project",
            "outside_app_key": "",
            "outside_staff_id": 0,
            "outside_charge_name": "",
            "cost": "0.00",
            "label_name_str": null,
            "show_modules": "",
            "redundancy_historical_update_version": 15,
            "redundancy_last_record_log": "[{\"name\":\"黄禅宗\",\"date\":\"2023-07-21 17:38:07\",\"record_msg\":\"项目\\/需求\\/问题\\/任务变更通知订阅推送，以及数据拉取API 需求状态从【研发中】改为【待发布】\",\"record_msg_change\":\"待发布\"}]",
            "need_plan_id": 0,
            "is_delay_reminder": 0,
            "delay_reminder_day_nums": 1,
            "have_send_delay_reminder": 0
        }
    },
    "msg": ""
}
```

## 拉取问题详情

> 温馨提示：```module_type=4```时，表示拉取问题详情（Bug/故障/缺陷/工单/风险），此时```module_type_id```对应问题ID。  

问题详情示例：
```json
{
    "ret": 200,
    "data": {
        "module_type": 4,
        "module_type_id": 7020907,
        "detail": {
            "id": 7020907,
            "problem_title": "批量操作按钮【取消关联】，增加二次确认弹窗交互",
            "problem_content": "<p>当前实现：</p><p><br/></p><p><font>优化方案：</font></p><p><font><br/></font></p>",
            "problem_type": 2,
            "problem_level": 20,
            "problem_status": 1,
            "problem_attribution": 0,
            "product_category_version_id": 0,
            "file_ids": null,
            "admin_id": 217216,
            "add_time": "2023-06-01 18:23:08",
            "app_key": "GCKJ",
            "created_staff_id": 12143,
            "assign_staff_id": 2598,
            "end_time": null,
            "is_follow": 0,
            "product_category_id": 17,
            "project_id": 102433,
            "need_id": 0,
            "test_plan_id": 0,
            "test_plan_case_id": 0,
            "sys_update_time": "2023-07-06 09:24:13",
            "outside_app_key": "",
            "outside_staff_id": 0,
            "from_channel": "project_problem_modal",
            "outside_charge_name": "",
            "label_name_str": null,
            "redundancy_historical_update_version": 2,
            "redundancy_last_record_log": "[{\"name\":\"彭xx\",\"date\":\"2023-07-06 09:24:12\",\"record_msg\":\"批量操作按钮【取消关联】，增加二次确认弹窗交互 问题所属项目从【六月YesDev产品迭代】改为【七月YesDev产品迭代】\",\"record_msg_change\":\"七月YesDev产品迭代\"}]"
        }
    },
    "msg": ""
}

```

## 拉取任务详情

> 温馨提示：```module_type=2```时，表示拉取任务详情，此时```module_type_id```对应任务ID。  

任务详情示例：
```json
{
    "ret": 200,
    "data": {
        "module_type": 2,
        "module_type_id": 80164349,
        "detail": {
            "id": 80164349,
            "task_title": "新建任务弹窗新增关联问题功能",
            "task_type": 3,
            "admin_id": 2600,
            "task_time": "2.0",
            "task_finish_time": "2023-07-12",
            "task_status": 1,
            "project_id": 102433,
            "problem_id": 0,
            "app_key": "GCKJ",
            "add_time": "2023-06-05 17:13:15",
            "staff_id": 2598,
            "need_id": 625625,
            "sys_update_time": "2023-07-24 08:00:02",
            "task_desc": "",
            "created_staff_id": 2598,
            "from_channel": "reqm_detail",
            "delay_days": 0,
            "outside_app_key": "",
            "outside_staff_id": 0,
            "outside_charge_name": "",
            "parent_id": 0,
            "label_name_str": null,
            "check_status": 0,
            "check_staff_id": 0,
            "redundancy_historical_update_version": 9,
            "redundancy_last_record_log": "[{\"name\":\"系统\",\"date\":\"2023-07-24 08:00:02\",\"record_msg\":\"任务#80164349 新建任务弹窗新增关联问题功能，已延期【12天7小时】\"}]",
            "task_delay_reminder_send_nums": 3,
            "task_delay_reminder_send_total_nums": 3,
            "last_task_delay_reminder_send_date": "2023-07-24 08:00:01"
        }
    },
    "msg": ""
}
```

除此之外，还可以拉取周报、PRD、文档、测试用例、测试计划的详情数据。  




