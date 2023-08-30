package utils

import "github.com/olahol/melody"

type Party struct {
	board         [42]int
	currentPlayer int
	players       [2]string
	score         [2]int
	ws            *melody.Melody
}

type PartyMap map[string]*Party

func New(p1 string) *Party {
	p := new(Party)
	p.ws = melody.New()
	p.Init()
	p.players[0] = p1

	return p
}

func (p *Party) Init() {
	p.score[0] = 0
	p.score[1] = 0
	p.currentPlayer = 1

	for i := 0; i < 42; i++ {
		p.board[i] = 0
	}

}

func (p *Party) GetBoard() [42]int {
	return p.board
}

func (p *Party) SetBoard(board [42]int) {
	p.board = board
}

func (p *Party) isPlayable(column int) bool {
	return p.board[column] == 0
}

func (p *Party) play(column int) {
	if p.isPlayable(column) {
		for i := 5; i >= 0; i-- {
			if p.board[column+i*7] == 0 {
				p.board[column+i*7] = p.currentPlayer
				break
			}
		}
	}
}
