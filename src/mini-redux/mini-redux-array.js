// 支持数组的中间件
// 判断如果是数组 则将其项分别dispatch 重走一遍
const arrayThunk = ({dispatch,getState})=>next=>action=>{
	if (Array.isArray(action)) {
		return action.forEach(v=>dispatch(v))
	}
	return next(action)
}
export default arrayThunk
