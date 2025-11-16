import { fetchClient } from "@/lib/api"
import { getSession } from "@/lib/session";
import Link from "next/link";
import { FollowButton } from "./_components/FollowButton/index";
import { defaultAvatarUrl } from "@/components/nav/LoginLink";

export default async function Profile({ params }: {
    params: Promise<{ name: string }>
}) {
    const username = await (await params).name

    const profileRes = await fetchClient.GET('/profiles/{username}', {
        'params': {
            path: {
                username
            }
        }
    })

    let currentUser = await getSession() ? (await fetchClient.GET('/user')).data?.user : null
    
    const profile = profileRes.data?.profile

    return <div className="profile-page">
        <div className="user-info">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-md-10 offset-md-1">
                        <img src={profile?.image || defaultAvatarUrl} className="user-img object-fill" alt={profile?.username} />
                        <h4>{profile?.username}</h4>
                        <p>
                            {profile?.bio || `There is nothing left from ${profile?.username}`}
                        </p>
                        {/* when the profile is the same user with the current login, not need to display the followButton */}
                        {currentUser?.username === username ? null : <FollowButton profileUser={profile} />}

                        {currentUser ?
                                <Link href={`/settings`} className="btn btn-sm btn-outline-secondary action-btn">
                                    <i className="ion-gear-a"></i>
                                    &nbsp; Edit Profile Settings
                                </Link>
                            : null}
                    </div>
                </div>
            </div>
        </div>

        <div className="container">
            <div className="row">
                <div className="col-xs-12 col-md-10 offset-md-1">
                    <div className="articles-toggle">
                        <ul className="nav nav-pills outline-active">
                            <li className="nav-item">
                                <a className="nav-link active" href="">My Articles</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="">Favorited Articles</a>
                            </li>
                        </ul>
                    </div>

                    <div className="article-preview">
                        <div className="article-meta">
                            <a href="/profile/eric-simons"><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
                            <div className="info">
                                <a href="/profile/eric-simons" className="author">Eric Simons</a>
                                <span className="date">January 20th</span>
                            </div>
                            <button className="btn btn-outline-primary btn-sm pull-xs-right">
                                <i className="ion-heart"></i> 29
                            </button>
                        </div>
                        <a href="/article/how-to-buil-webapps-that-scale" className="preview-link">
                            <h1>How to build webapps that scale</h1>
                            <p>This is the description for the post.</p>
                            <span>Read more...</span>
                            <ul className="tag-list">
                                <li className="tag-default tag-pill tag-outline">realworld</li>
                                <li className="tag-default tag-pill tag-outline">implementations</li>
                            </ul>
                        </a>
                    </div>

                    <div className="article-preview">
                        <div className="article-meta">
                            <a href="/profile/albert-pai"><img src="http://i.imgur.com/N4VcUeJ.jpg" /></a>
                            <div className="info">
                                <a href="/profile/albert-pai" className="author">Albert Pai</a>
                                <span className="date">January 20th</span>
                            </div>
                            <button className="btn btn-outline-primary btn-sm pull-xs-right">
                                <i className="ion-heart"></i> 32
                            </button>
                        </div>
                        <a href="/article/the-song-you" className="preview-link">
                            <h1>The song you won't ever stop singing. No matter how hard you try.</h1>
                            <p>This is the description for the post.</p>
                            <span>Read more...</span>
                            <ul className="tag-list">
                                <li className="tag-default tag-pill tag-outline">Music</li>
                                <li className="tag-default tag-pill tag-outline">Song</li>
                            </ul>
                        </a>
                    </div>

                    <ul className="pagination">
                        <li className="page-item active">
                            <a className="page-link" href="">1</a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="">2</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
}