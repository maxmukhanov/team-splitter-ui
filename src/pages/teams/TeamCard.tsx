import { Team, Game } from "../../api/Team.types";
import { Button, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Player } from "api/Player.types";
import { useEffect } from "react";
import { useState } from "react";
import ConfirmDialog from 'components/ConfirmDialog';
import { deleteGamePlayerEntry } from "services/GameService";

type TeamCardProps = {
    team: Team
    game?: Game
}

const TeamCard = ({team, game}: TeamCardProps) => {
    const [open, setOpen] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState<Player>({} as Player);

    const onDeletePlayerEntry = async (gameId:number , player: Player) => {
        await deleteGamePlayerEntry(gameId, player.id);
    }

    return (
        <div style={{width: "400px", display:"block", float: "left"}}>
            <h1>{team.name}</h1>
            <ol>
                {team.players.map((player) => {
                    return (
                        <li key={player.id}>
                            {player.firstName} {player.lastName} {player.score}
                            {game &&
                                <Tooltip title="Delete">
                                    <IconButton onClick={async (e) => {
                                        setOpen(true); 
                                        setSelectedPlayer(player);
                                    }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            }
                            
                        </li>
                    )
                })}
            </ol>

            {game &&
                <ConfirmDialog
                            title="Delete Player from Game?"
                            open={open}
                            setOpen={setOpen}
                            onConfirm={()=> onDeletePlayerEntry(game.id, selectedPlayer)}
                        >
                            Are you sure you want to delete this player?
                        </ConfirmDialog>
            }
        </div>
    )
}

export default TeamCard;