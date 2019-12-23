# ngx-componentdestroyed to ngx-observable-lifecycle

* search: ```import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';```
  replace: ```import { takeUntilDestroyed } from '@pdtec/ngx-observable-lifecycle';```
* search: ```untilComponentDestroyed(this)```
  replace: ```takeUntilDestroyed(this)```
* replace ```implements OnDestroy``` with ```extends OnDestroy$```
  add super call to constructor
* remove empty ngOnDestroy methods