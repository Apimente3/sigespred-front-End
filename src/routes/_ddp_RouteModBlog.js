
import { Blog } from "../sigespred/_ddp_blog/Blog";
import { BlogAdd } from "../sigespred/_ddp_blog/BlogAdd";
import { BlogEdit } from "../sigespred/_ddp_blog/BlogEdit";
import { BlogPost } from "../sigespred/_ddp_blog/BlogPost";
import { DisplayAllPost } from "../sigespred/_ddp_blog/DisplayAllPost";
import { Post } from "../sigespred/_ddp_blog/Post";

import { Single_Post } from "../sigespred/_ddp_blog/Single_Post";



const RouteModBlog = [
    {path: "/blog", component: Blog},
    {path: "/blog-add", component: BlogAdd},
    {path: "/blog-edit/:id", component: BlogEdit },
    {path: "/post", component: Post },
    {path: "/display-post", component: DisplayAllPost },
    {path: "/single-post/:id", component: Single_Post },
    
]

export default RouteModBlog;