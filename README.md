#### 我下面是扩展`element-ui`中表单验证的规则也写了一下让每一个验证自动`trim`的办法


我这个示例是写了一个只允许数字字母下划线的验证规则名字叫做`pureString`


我这个示例是直接通过`vue-cli`安装的项目,然后就仅仅安装了`element-ui`


1. 在`src`下面新建文件夹`el-components`
2. 找到`node_modules\element-ui\packages\form\src\form-item.vue`和`label-wrap.vue`复制粘贴到`el-components`下面
3. 在`el-components`下面新建文件夹`async-validator`
3. `npm clone https://github.com/yiminghe/async-validator.git` 到你自己的电脑中把其中的src中的内容复制到上面的`async-validator`下面
4. 修改文件`form-item.vue`中的 `import AsyncValidator from 'async-validator';`为 `import AsyncValidator from './async-validator';`
5. 打开文件`src\el-components\async-validator\rule\type.js`在`pattern`这个常量对象中添加新的属性`pureString: /^[\w]*$/在const types`这个常量对象中添加新的type方法
```js
pureString(value) {
    return typeof value === 'string' && pattern.pureString.test(value)
  }
```
6. 在下面的`custom`常量数组中添加一个`'pureString'`
7. 打开文件`src\el-components\async-validator\messages.js`在types中添加一个键值对`pureString: '%s 只能由数字字母下划线组成'`
8. 打开文件`src\el-components\async-validator\validator\index.js`添加一个键值对 `pureString: type`
9. 可能需要去`src\el-components\async-validator\util.js`将大约67行这个代码删除掉
```js
for (let arg = args[i]; i < len; arg = args[++i]) {
      str += ` ${arg}`;
    }
```

10. 打开文件`main.js`引入
```js
import FormItem from './el-components/form-item'
```
在
```js
Vue.use(ElementUI);
```
下面添加一句
```js
Vue.component(FormItem.name,FormItem)
```

11. 在任意表单验证的rules中加上一句`{ type:'pureString'}`,例如
```js
rules: {
  name: [
    { required: true, message: '请输入活动名称', trigger: 'blur'},
    { type:'pureString',fullField:'用户名'}
  ]
}
```
#### 下面是让每一个验证都去掉前后空格的代码

12. 在el-components下面新建文件transform.js内容是
```js
export default function(value){
  if(Object.prototype.toString.call(value)==='[object String]'){
    return value.trim()
  }
  return value
}
```

13. 打开`src\el-components\form-item.vue`引入一下上面的`transform.js`然后大约在第201行左右原代码是
```js
if (rules && rules.length > 0) {
  rules.forEach(rule => {
    delete rule.trigger;
  });
}
```
加上一个循环代码变成
```js
if (rules && rules.length > 0) {
   rules.forEach(rule => {
     delete rule.trigger;
   });
   rules.forEach(rule=> {
     rule.transform = transform
   })
}
```
