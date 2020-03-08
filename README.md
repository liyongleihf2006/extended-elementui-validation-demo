我下面是扩展element-ui中表单验证的规则后面也写一下让每一个验证自动的trim的办法
我这个实例是写了一个只允许数字字母下划线的验证规则名字叫做pureString
1. 在src下面新建文件夹el-components
2. 找到node_modules\element-ui\packages\form\src\form-item.vue和label-wrap.vue复制粘贴到el-components下面
3. 在el-components下面新建文件夹async-validator
3. npm clone https://github.com/yiminghe/async-validator.git 到你自己的电脑中把其中的src中的内容复制到上面的async-validator下面
4. 修改文件form-item.vue中的 import AsyncValidator from 'async-validator';为 import AsyncValidator from './async-validator';
5. 打开文件src\el-components\async-validator\rule\type.js在pattern这个常量对象中添加新的属性pureString: /^[\w]*$/在const types这个常量对象中添加新的type方法pureString(value) {
    return typeof value === 'string' && pattern.pureString.test(value)
  }
在下面的custom常量数组中添加一个'pureString'
6. 打开文件src\el-components\async-validator\messages.js在types中添加一个键值对pureString: '%s 只能由数字字母下划线组成'
7. 打开文件src\el-components\async-validator\validator\index.js添加一个键值对 pureString: type
8. 可能需要去src\el-components\async-validator\util.js将大约67行这个代码删除掉for (let arg = args[i]; i < len; arg = args[++i]) {
      str += ` ${arg}`;
    }
8. 打开文件main.js引入import FormItem from './el-components/form-item'在Vue.use(ElementUI);下面添加一句Vue.component(FormItem.name,FormItem)
9. 在任意表单验证的rules中加上一句{ type:'pureString'},例如
rules: {
  name: [
    { required: true, message: '请输入活动名称', trigger: 'blur'},
    { type:'pureString',fullField:'用户名'}
  ]
}
##下面是让每一个验证都去掉前后空格的代码
10. 在el-components下面新建文件transform.js内容是
export default function(value){
  if(Object.prototype.toString.call(value)==='[object String]'){
    return value.trim()
  }
  return value
}
11. 打开src\el-components\form-item.vue引入一下上面的transform.js然后大约在第201行左右原代码是if (rules && rules.length > 0) {
          rules.forEach(rule => {
            delete rule.trigger;
          });
        }加上一个循环代码变成if (rules && rules.length > 0) {
          rules.forEach(rule => {
            delete rule.trigger;
          });
          rules.forEach(rule=> {
            rule.transform = transform
          })
        }