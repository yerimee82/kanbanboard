package com.poscodx.kanbanboard.Service;

import com.poscodx.kanbanboard.Repository.MemberRepository;
import com.poscodx.kanbanboard.domain.Board;
import com.poscodx.kanbanboard.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    @Transactional
    public Long join(Member member) {
        // 임시 -- 기본 사용자, 기본 칸반보드 생성
        Board board = Board.createBoard(member);
        member.setBoard(board);

        memberRepository.save(member);
        return member.getId();
    }

    public Member findOne(Long memberId) {
        return memberRepository.findOne(memberId);
    }
}
