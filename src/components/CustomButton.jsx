import { Button } from 'antd';
import {motion} from "framer-motion"



const CustomButton = (props) => (
 <motion.div
 animate={{
  scale: [1, 2, 2, 1, 1],
  borderRadius: ["20%", "20%", "50%", "50%", "20%"],
}}

 >
<Button size="large" className='customButton' onClick={props.onSubmit}>
  {props.title}
</Button>
</motion.div>
);

export default CustomButton;