import { Title } from "@mantine/core";
import { useRouter } from "next/router"
import VodViewHeader from "../../components/VodViewHeader";

export default function GameVodView() {
	const router = useRouter();
	const { gameName } = router.query;

	return <VodViewHeader/>
}