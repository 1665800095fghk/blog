import {Avatar,Divider} from "antd"

const Author = () => (
  <div className="author-div">
    <div><Avatar size={100} src="../static/images/hx.jpg" onError={()=>alert("ssss")} /></div>
    <div className="author-introduction">
      普通的宅男而已
      <Divider>社交账号</Divider>
      <Avatar size={28} icon="github" className="account"  />
      <Avatar size={28} icon="qq"  className="account" />
      <Avatar size={28} icon="wechat"  className="account"  />
    </div>
  </div>
)
export default Author