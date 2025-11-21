"use client"

export const FollowButton = ({
    username,
    following,
    action
}: {
    following?: boolean
    username?: string
    action: Function
}) => {
    return (
      <button className="btn btn-sm btn-outline-secondary" onClick={() => action()}>
        <i className="ion-plus-round"></i>
        &nbsp; {following ? "UnFollow" : "Follow"} {username}
        {/* <span className="counter">(0)</span> */}
      </button>
    );
}