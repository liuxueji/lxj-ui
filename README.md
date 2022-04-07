```
本项目是本人在校期间完成的基于vue2的ui组件库

安装组件库 npm i lxj-ui

全局引入
   	import LxjUi from 'lxj-ui' 
   	import 'lxj-ui/dist/lxj-ui.css'  
   	Vue.use(LxjUi)
```



# 一、button组件

### 1.参数支持

| 参数名   | 参数描述                                        | 参数类型 | 默认值  |
| -------- | ----------------------------------------------- | -------- | ------- |
| type     | 按钮类型（primary/success/warning/danger/info） | string   | default |
| plain    | 是否是朴素按钮                                  | boolean  | false   |
| round    | 是否是圆角按钮                                  | boolean  | false   |
| circle   | 是否是圆形按钮                                  | boolean  | false   |
| disabled | 是否禁用按钮                                    | boolean  | fals    |

### 2.事件支持：

| 事件名 | 事件描述 |
| :----- | :------- |
| click  | 点击事件 |

### 3.样式参考：

![img](file://D:\前端学习笔记\个人笔记\自定义ui组件库\image\Snipaste_2022-04-05_12-56-49.png?lastModify=1649329069)

# 二、dialog组件

### 1.参数支持

| 参数名  | 参数描述                         | 参数类型 | 默认值 |
| ------- | -------------------------------- | -------- | ------ |
| title   | 对话框标题                       | string   | 提示   |
| width   | 宽度                             | string   | 50%    |
| top     | 与顶部的距离                     | string   | 15vh   |
| visible | 是否显示dialog（支持sync修饰符） | boolean  | false  |

### 2.事件支持

| 事件名 | 事件描述         |
| ------ | ---------------- |
| opend  | 模态框显示的事件 |
| closed | 模态框关闭的事件 |

### 3.插槽的说明

| 插槽名称 | 插槽描述           |
| -------- | ------------------ |
| default  | dialog的内容       |
| title    | dialog的标题       |
| footer   | dialog的底部操作区 |

### 4.样式参考：

![img](file://D:\前端学习笔记\个人笔记\自定义ui组件库\image\Snipaste_2022-04-06_01-19-28.png?lastModify=1649329175)

# 三、input组件

### 1.参数支持

| 参数名称      | 参数描述                  | 参数类型 | 默认值 |
| ------------- | ------------------------- | -------- | ------ |
| placeholder   | 占位符                    | string   | 无     |
| type          | 文本框类型(text/password) | string   | text   |
| disabled      | 禁用                      | boolean  | false  |
| clearable     | 是否显示清空按钮          | boolean  | false  |
| show-password | 是否显示密码切换按钮      | boolean  | false  |
| name          | name属性                  | string   | 无     |

### 2.事件支持

| 事件名称 | 事件描述       |
| -------- | -------------- |
| blur     | 失去焦点事件   |
| change   | 内容改变事件   |
| focus    | 获取的焦点事件 |

### 3.样式参考：

![img](file://D:\前端学习笔记\个人笔记\自定义ui组件库\image\Snipaste_2022-04-06_16-23-05.png?lastModify=1649329216)

# 四、switch

### 1.参数支持

| 参数名称      | 参数描述           | 参数类型 | 默认值 |
| ------------- | ------------------ | -------- | ------ |
| v-model       | 双向绑定           | 布尔类型 | false  |
| name          | name属性           | string   | text   |
| activeColor   | 自定义的激活颜色   | string   |        |
| inactiveColor | 自定义的不激活颜色 | string   |        |

### 2.事件支持

| 事件名称 | 事件描述           |
| -------- | ------------------ |
| change   | change时触发的事件 |

### 3.样式参考

![](D:\前端学习笔记\个人笔记\自定义ui组件库\image\Snipaste_2022-04-07_19-02-25.png)

# 五、radio组件

### 1.参数支持

| 参数名称 | 参数描述        | 参数类型             | 默认值 |
| :------- | :-------------- | :------------------- | :----- |
| v-model  | 双向绑定        | 布尔类型             | false  |
| label    | 单选框和value值 | string，num，Boolean | ' '    |
| name     | radio的name值   | String               | ''     |

### 2.样式参考：

![img](file://D:\前端学习笔记\个人笔记\自定义ui组件库\image\Snipaste_2022-04-07_10-02-19.png?lastModify=1649329415)

# 六、radio-group组件

### 1.参数支持

| 参数名称 | 参数描述 | 参数类型 | 默认值 |
| :------- | :------- | :------- | :----- |
| v-model  | 双向绑定 | 布尔类型 | false  |



# 七、checkout组件

### 1.参数支持

| 参数名称 | 参数描述        | 参数类型             | 默认值 |
| :------- | :-------------- | :------------------- | :----- |
| v-model  | 双向绑定        | 布尔类型             | false  |
| label    | 单选框和value值 | string，num，Boolean | ' '    |
| name     | radio的name值   | String               | ''     |

### 2.样式参考：

![img](file://D:\前端学习笔记\个人笔记\自定义ui组件库\image\Snipaste_2022-04-07_10-24-25.png?lastModify=1649329708)

# 八、checkout-group组件

### 1.参数支持

| 参数名称 | 参数描述 | 参数类型 | 默认值 |
| :------- | :------- | :------- | :----- |
| v-model  | 双向绑定 | 布尔类型 | false  |

# 九、form组件

### 1.参数支持

| 参数名称    | 参数描述         | 参数类型 | 默认值 |
| :---------- | :--------------- | :------- | :----- |
| model       | 表单数据对象     | object   |        |
| label-width | 表单域标签的宽度 | string   | 80px   |

# 十、form-item

| 参数名称 | 参数描述   | 参数类型 | 默认值 |
| :------- | :--------- | :------- | :----- |
| label    | 表单项内容 | string   | ''     |