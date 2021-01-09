/** 
 *postcss的配置文件
 */
module.exports = {
    // 配置要是用的相关插件
    plugins: {
        'postcss-pxtorem': {
            //转换的根元素的基准值
            //根据 设计稿宽度 / 10  来设置 如375px/10
            //但是vant默认37.5,所以要将设计稿宽度设置为375px方便测量
            rootValue: 37.5,
            //需要转换的css属性,* 代表所有属性  例如'font-size'只转换字体大小属性
            propList: ['*'],
        },
    },
};