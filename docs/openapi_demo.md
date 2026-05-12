# 接入场景及示例

下面以把业务系统的工单和YesDev的工单进行关联，以构建自己的技术工单业务处理流程。   

## 所用到的OpenAPI接口  

 + [创建新问题接口](https://www.yesdev.cn/docs.php?service=App.Problem.CreateNewProblem&detail=1&type=fold)  

## 业务系统的工单界面

例如，在业务系统，用户可以通过业务系统提交工单。其提交界面如下：  
![](http://cd8.okayapi.com/yesyesapi_20220302151441_46e6e28381a1be4d377c2b3669ddc5f5.png)  

用户在业务系统通过界面提交工单后，可以在服务器后端调用OpenAPI接口，例如：  
```
https://www.yesdev.cn/?s=App.Problem.CreateNewProblem&app_key=XXXX&sign=02358FF5577E8DFBC155034974AD0D32&problem_title=题标题&problem_content=问题内容
```

## 在YesDev的浏览效果

接下来，研发团队就可以在YesDev进行问题的跟踪和流转了。  

![](http://cd8.okayapi.com/yesyesapi_20220302151658_bf3c0573244f6acda576e9732e9b2542.png)  


