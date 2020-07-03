import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TabsPage } from './tabs.page';

const routes: Routes = [
	{
		path: '',
		component: TabsPage,
		children: [
      { path: 'feed',
        loadChildren: () => import('./../privates/feed/feed.module').then( m => m.FeedPageModule)
      },
      { path: 'uploader',
        loadChildren: () => import('./../privates/uploader/uploader.module').then( m => m.UploaderPageModule)
      },
      { path: 'profile',
        loadChildren: () => import('./../privates/profile/profile.module').then( m => m.ProfilePageModule)
      },
      { path: 'post/:id',
        loadChildren: () => import('./../privates/post/post.module').then( m => m.PostPageModule)
      },
      { path: 'edit-profile',
        loadChildren: () => import('./../privates/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/feed',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/feed',
    pathMatch: 'full'
  }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TabsRoutingModule { }