# 基本思考

## 为什么

现状, 开发框架 / 构建工具过多的受文件系统的限制, 而不是专注于 "编程单元" 之间的实际逻辑结构.

例如: 

```
in <MainLayout.js>

import {SomeComponent} from '../../components/SomeComponent.js';
...

class MainLayout extends Component {
    render() {
        return <div>
            <SomeComponenent />
        </div>
    }
}

```

以上的代码, 实际上有两层依赖:

1. 目的依赖 (我们最关注的): MainLayout 在代码逻辑上依赖于 SomeComponent.
2. 隐含依赖 (被隐式加入的依赖): SomeComponent 这个资源的获取来源, 见 `from '../../components/SomeComponent.js`.

以上这个隐含依赖带来的问题是, 在实际的代码中, 我们强制给定了这个 "逻辑依赖" 在文件系统中的位置, 导致代码在文件系统中无法很容易的进行移动和重命名等重构. 

这种问题累计多了, 即导致任何项目都会随着时间的推移而变得越来越难在文件结构上进行调整优化, 从而逐渐的僵化难以维护.


### 依赖注入的思考

依赖注入潜在的优点之一, 就是缓解了这个问题, 大多数的实现方式是: 

- 实现注册规则
- 实现依赖定义规则
- 根据这些规则实现集配器

比如在 [angular dependency injection](https://angular.io/guide/dependency-injection-in-action) ([示例](https://angular.io/generated/live-examples/dependency-injection-in-action/eplnkr.html) ) 内, 你会看到类似这种代码:

```
in <app.component.ts>

import { LoggerService }      from './logger.service';
import { UserContextService } from './user-context.service';
import { UserService }        from './user.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  providers: [ LoggerService, UserContextService, UserService ]
})

export class AppComponent {
 /* . . . */
}


in <hero-bios.component.ts>

export class HeroBiosComponent {
  constructor(logger: LoggerService) {
    logger.logInfo('Creating HeroBiosComponent');
  }
}
```

在这个方式里, HeroBiosComponent 依赖于 LoggerService 这个服务, 但并不需要去担心它到底在哪, 是如何被初始化, 如何提供过来的. 它只操心要用这个服务来做什么就可以. 实际的情况如下:

1. HeroBios (及其他组件) 逻辑依赖于 LoggerService
2. AppComponent 逻辑依赖/物理结构于 LoggerService 

这样, 在 LoggerService 发生实际物理结构上的变动, 我们也不用去担心有非常多的地方需要去调整.
