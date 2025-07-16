import { PageWrapper } from "../layout/PageWrapper";
import { Post, Website } from "../types";
import { getPostBasePath } from "../utils/paths";

const yearMonthFromTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return [date.getMonth() + 1, date.getFullYear()];
}
const monthFromTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { month: 'long' });
}
const dayFromTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { day: 'numeric' });
}
const groupPosts = (posts: Post[]) => {
    let group = new Map<number, Map<number, Post[]>>()
    posts.sort((t1, t2) => t2.publishedAt - t1.publishedAt)
    for (const post of posts) {
        const [month, year] = yearMonthFromTimestamp(post.publishedAt);
        let years = group.get(year) ?? new Map<number, Post[]>();
        let monthPosts = years.get(month) ?? [];
        monthPosts.push(post);
        years.set(month, monthPosts);
        group.set(year, years);
    };
    return group;
}

const Month = ({ posts, website }: { posts: Post[], website: Website }) => {
    return <div>
        <h4>{monthFromTimestamp(posts[0].publishedAt)}</h4>

        {posts.map((post) => {
            const postLink = getPostBasePath({ post, website });
            const day = dayFromTimestamp(post.publishedAt);
            return <a href={postLink}>{day}</a>
        })}
    </div>
}

const Year = ({ year, months, website }: { year: number, months: Map<number, Post[]>, website: Website }) => {
    return <div>
        <h3>{year}</h3>

        {Array.from(months)
            .map(([month, posts]) => <Month posts={posts} website={website} />)
        }
    </div>
}

export const ArchivePage = ({ posts, website }: { posts: Post[], website: Website }) => {
    const grouppedPosts = groupPosts(posts);

    return <PageWrapper website={website}>
        <h2>Archive</h2>

        {Array.from(grouppedPosts)
            .map(([year, months]) => <Year year={year} months={months} website={website} />)
        }
    </PageWrapper>;
};
