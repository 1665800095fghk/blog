import {Avatar,Divider,Image} from "antd"
import imageURL from '../../public/hx.jpg'

const Author = () => (
  <div className="author-div comm-box">
    <div>
      <Avatar size={100} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"  />
    </div>
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