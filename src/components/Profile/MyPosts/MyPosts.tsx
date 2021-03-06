import { Post } from "./Post/Post";
import { MyPostPropsType } from "./MyPostsContainer";
import style from './MyPosts.module.css'
import { PostForm } from "../../Form/PostForm";

export const MyPosts = (props: MyPostPropsType) => {
    const postsElements = props.posts.map((p, key) =>
        <Post key={key} message={p.message} likesCount={p.likesCount} />);

    const onSubmit = ({ post }: { post: string }) => {
        props.addPost(post);
    };

    return (
        <div className={style.postsBlock}>
            <PostForm onSubmit={onSubmit} />
            <div className={style.posts}>
                {postsElements}
            </div>
        </div>
    )
}
