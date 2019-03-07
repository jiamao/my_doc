`BCompare`是一个文件和文件夹对比神器，比`SVN`自带的工具要好用和直观得多。

使用`BCompare`习惯后用`SVN/git`那个真心蛋痛。安装包见附件。

安装好BCompare和对SVN/git做如下配置即可：

1. 进入`svn-settions`,选 中`Diff Viewer`菜单，在右边的配置中选择`External`,上下二个都要选择，同时在路径中配上：`"D:\Program Files\Beyond Compare 3\BComp.exe" %base %mine /title1=%bname /title2=%yname /leftreadonly`

前端是你`bcompare`安装路径。上下二个配置相同。
> ![bp](https://github.com/jiamao/my_doc/blob/master/imgs/bp1.jpg)


2. 选中`Merge Tool`选项，同样在右边选中External,在路径中填入：`"D:\Program Files\Beyond Compare 3\BComp.exe" %mine %theirs %base %merged /title1=%yname /title2=%tname /title3=%bname /title4=%mname`
> ![bp](https://github.com/jiamao/my_doc/blob/master/imgs/bp2.jpg)


确定保存即可。

看一下效果如何：
> ![bp](https://github.com/jiamao/my_doc/blob/master/imgs/bp3.jpg)


个人觉得比默认的工具要强大很多，同时这个工具也可以用来对比和合并本地文件；
> ![bp](https://github.com/jiamao/my_doc/blob/master/imgs/bp4.jpg)

> ![bp](https://github.com/jiamao/my_doc/blob/master/imgs/bp5.jpg)


各种快捷操作熟悉后就是神器了。合并代码等也就不再很难了。