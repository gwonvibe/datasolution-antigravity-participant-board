/**
 * 교육·세미나 참가자 관리판 도구
 * 기존 Apps Script doGet 계약 호환 및 로컬 샘플 데이터 내장
 */

const DEFAULT_PARTICIPANTS = [
  { id: 1, name: '김민준', org: '한빛소프트웨어', role: '팀장', email: 'minjun@hanbitsoft.co.kr', phone: '010-2440-7712', date: '2026-10-05', status: '확정' },
  { id: 2, name: '이서준', org: '서울디지털재단', role: '대리', email: 'seojun@sdf.or.kr', phone: '010-6739-5629', date: '2026-10-06', status: '확정' },
  { id: 3, name: '박도윤', org: '동아물류', role: '과장', email: 'doyun@dongalogis.com', phone: '010-3044-8577', date: '2026-10-07', status: '신청' },
  { id: 4, name: '최예준', org: '미래에셋연구소', role: '사원', email: 'yejun@miraeresearch.re.kr', phone: '010-5024-3027', date: '2026-10-08', status: '참석' },
  { id: 5, name: '정시우', org: '한국스마트테크', role: '부장', email: 'siwoo@k-smarttech.co.kr', phone: '010-3343-8009', date: '2026-10-08', status: '불참' },
  { id: 6, name: '강하준', org: '이노베이션그룹', role: '이사', email: 'hajun@innovationgroup.com', phone: '010-3192-9732', date: '2026-10-08', status: '확정' },
  { id: 7, name: '조주원', org: '한강정보기술', role: '대표', email: 'juwon@hangangit.kr', phone: '010-2431-4890', date: '2026-10-08', status: '확정' },
  { id: 8, name: '윤지호', org: '글로벌네트웍스', role: '연구원', email: 'jiho@globalnets.com', phone: '010-7254-1037', date: '2026-10-10', status: '신청' },
  { id: 9, name: '장지훈', org: '메가클라우드', role: '선임', email: 'jihun@megacloud.co.kr', phone: '010-9437-1223', date: '2026-10-10', status: '확정' },
  { id: 10, name: '임준우', org: '베스트인공지능', role: '팀장', email: 'junwoo@bestai.kr', phone: '010-8533-9778', date: '2026-10-10', status: '참석' },
  { id: 11, name: '한서진', org: '유니버설시스템즈', role: '사원', email: 'seojin@universalsys.com', phone: '010-7520-5205', date: '2026-10-10', status: '확정' },
  { id: 12, name: '오건우', org: '스페이스컴퍼니', role: '대리', email: 'gunwoo@spacecompany.co.kr', phone: '010-8524-8274', date: '2026-10-11', status: '신청' },
  { id: 13, name: '서우진', org: '프론티어랩스', role: '과장', email: 'woojin@frontierlabs.re.kr', phone: '010-9603-8078', date: '2026-10-11', status: '확정' },
  { id: 14, name: '신선우', org: '스마트솔루션', role: '부장', email: 'sunwoo@smartsol.kr', phone: '010-7023-3486', date: '2026-10-11', status: '확정' },
  { id: 15, name: '권연우', org: '비전테크놀로지', role: '이사', email: 'yeonwoo@visiontech.com', phone: '010-8731-2230', date: '2026-10-12', status: '참석' },
  { id: 16, name: '황영철', org: '파워인베스트', role: '연구원', email: 'youngchul@powerinvest.co.kr', phone: '010-8872-4530', date: '2026-10-13', status: '확정' },
  { id: 17, name: '안재현', org: '리드인포매틱스', role: '선임', email: 'jaehyun@leadinformatics.com', phone: '010-5365-5621', date: '2026-10-13', status: '불참' },
  { id: 18, name: '송민호', org: '알파소프트웨어', role: '팀장', email: 'minho@alphasoft.co.kr', phone: '010-6655-8902', date: '2026-10-14', status: '신청' },
  { id: 19, name: '전동현', org: '베타모빌리티', role: '사원', email: 'donghyun@betamobility.com', phone: '010-2693-6269', date: '2026-10-14', status: '확정' },
  { id: 20, name: '홍승민', org: '감마로보틱스', role: '대리', email: 'seungmin@gammarobotics.kr', phone: '010-4649-8040', date: '2026-10-14', status: '확정' },
  { id: 21, name: '유현우', org: '델타보안', role: '과장', email: 'hyunwoo@deltasec.co.kr', phone: '010-9873-5893', date: '2026-10-14', status: '참석' },
  { id: 22, name: '고승현', org: '엡실론바이오', role: '부장', email: 'seunghyun@epsilonbio.com', phone: '010-2835-6936', date: '2026-10-15', status: '신청' },
  { id: 23, name: '문지훈', org: '제타에너지', role: '연구원', email: 'jihun.m@zetaenergy.kr', phone: '010-2345-3190', date: '2026-10-17', status: '확정' },
  { id: 24, name: '양민재', org: '에타건설', role: '선임', email: 'minjae@etaconst.co.kr', phone: '010-7917-3399', date: '2026-10-17', status: '확정' },
  { id: 25, name: '손현준', org: '세타미디어', role: '팀장', email: 'hyunjun@thetamedia.com', phone: '010-7506-1625', date: '2026-10-17', status: '신청' },
  { id: 26, name: '배동현', org: '이오타엔터테인먼트', role: '대리', email: 'donghyun.b@iotaent.kr', phone: '010-3148-3050', date: '2026-10-19', status: '확정' },
  { id: 27, name: '백진우', org: '넥스트모바일', role: '사원', email: 'jinwoo@nextmobile.co.kr', phone: '010-6230-9131', date: '2026-10-20', status: '참석' },
  { id: 28, name: '허민석', org: '퓨처인사이트', role: '과장', email: 'minseok@futureinsight.com', phone: '010-7189-8896', date: '2026-10-21', status: '신청' },
  { id: 29, name: '남지성', org: '한국메타버스랩', role: '부장', email: 'jisung@k-metaverse.kr', phone: '010-5532-1517', date: '2026-10-22', status: '신청' },
  { id: 30, name: '심성민', org: '대한클라우드', role: '연구원', email: 'sungmin@daehancloud.com', phone: '010-6813-3944', date: '2026-10-23', status: '확정' }
];

let participants = [];
let searchQuery = '';
let currentFilter = '전체';
let sortColumn = 'date';
let sortDirection = 'desc'; // 'asc' or 'desc'
let selectedIds = new Set();
let sheetApiUrl = 'https://script.google.com/macros/s/AKfycbwwHpXjOso52A7TW71DZFBQOvUug7jgoKvvo7KRtRJ8BVYF2VQIH3H0QVmeSD4d-SSV/exec';

function initApp() {
  participants = JSON.parse(JSON.stringify(DEFAULT_PARTICIPANTS));
  renderAll();
}

function renderAll() {
  renderSummaryStats();
  renderTable();
}

function renderSummaryStats() {
  const total = participants.length;
  const applied = participants.filter(p => p.status === '신청').length;
  const confirmed = participants.filter(p => p.status === '확정').length;
  const attended = participants.filter(p => p.status === '참석').length;
  const absent = participants.filter(p => p.status === '불참').length;

  const countTotal = document.getElementById('countTotal');
  const countApplied = document.getElementById('countApplied');
  const countConfirmed = document.getElementById('countConfirmed');
  const countAttended = document.getElementById('countAttended');
  const countAbsent = document.getElementById('countAbsent');

  if (countTotal) countTotal.textContent = total;
  if (countApplied) countApplied.textContent = applied;
  if (countConfirmed) countConfirmed.textContent = confirmed;
  if (countAttended) countAttended.textContent = attended;
  if (countAbsent) countAbsent.textContent = absent;

  // 필터 버튼 레이블 업데이트
  const btnTotal = document.querySelector('[data-filter="전체"]');
  const btnApplied = document.querySelector('[data-filter="신청"]');
  const btnConfirmed = document.querySelector('[data-filter="확정"]');
  const btnAttended = document.querySelector('[data-filter="참석"]');
  const btnAbsent = document.querySelector('[data-filter="불참"]');

  if (btnTotal) btnTotal.textContent = `전체 (${total})`;
  if (btnApplied) btnApplied.textContent = `신청 (${applied})`;
  if (btnConfirmed) btnConfirmed.textContent = `확정 (${confirmed})`;
  if (btnAttended) btnAttended.textContent = `참석 (${attended})`;
  if (btnAbsent) btnAbsent.textContent = `불참 (${absent})`;
}

function getFilteredAndSortedList() {
  return participants.filter(p => {
    if (currentFilter !== '전체' && p.status !== currentFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchOrg = p.org.toLowerCase().includes(q);
      const matchEmail = p.email.toLowerCase().includes(q);
      if (!matchName && !matchOrg && !matchEmail) return false;
    }
    return true;
  }).sort((a, b) => {
    let valA = a[sortColumn];
    let valB = b[sortColumn];
    if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
    if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
}

function renderTable() {
  const tbody = document.getElementById('participantTableBody');
  const selectAll = document.getElementById('selectAll');
  if (!tbody) return;

  const list = getFilteredAndSortedList();
  tbody.innerHTML = '';

  if (list.length === 0) {
    tbody.innerHTML = '<tr><td colspan="9" class="text-center py-6 text-muted">일치하는 참가자가 없습니다.</td></tr>';
    if (selectAll) selectAll.checked = false;
    return;
  }

  list.forEach((p, idx) => {
    const isChecked = selectedIds.has(p.id);
    const tr = document.createElement('tr');
    tr.className = isChecked ? 'row-selected' : '';

    let badgeClass = 'badge-applied';
    if (p.status === '확정') badgeClass = 'badge-confirmed';
    if (p.status === '참석') badgeClass = 'badge-attended';
    if (p.status === '불참') badgeClass = 'badge-absent';

    tr.innerHTML = `
      <td class="text-center">
        <input type="checkbox" class="row-checkbox" data-id="${p.id}" ${isChecked ? 'checked' : ''}>
      </td>
      <td class="text-center text-muted">${idx + 1}</td>
      <td class="font-bold">${p.name}</td>
      <td>${p.org}</td>
      <td>${p.role}</td>
      <td class="font-mono">${p.email}</td>
      <td class="font-mono">${p.phone}</td>
      <td class="font-mono text-center">${p.date}</td>
      <td class="text-center">
        <select class="status-dropdown ${badgeClass}" data-id="${p.id}">
          <option value="신청" ${p.status === '신청' ? 'selected' : ''}>신청</option>
          <option value="확정" ${p.status === '확정' ? 'selected' : ''}>확정</option>
          <option value="참석" ${p.status === '참석' ? 'selected' : ''}>참석</option>
          <option value="불참" ${p.status === '불참' ? 'selected' : ''}>불참</option>
        </select>
      </td>
    `;

    const chk = tr.querySelector('.row-checkbox');
    chk.addEventListener('change', e => {
      if (e.target.checked) selectedIds.add(p.id);
      else selectedIds.delete(p.id);
      tr.classList.toggle('row-selected', e.target.checked);
      updateSelectAllState(list);
    });

    const sel = tr.querySelector('.status-dropdown');
    sel.addEventListener('change', e => {
      p.status = e.target.value;
      renderAll();
    });

    tbody.appendChild(tr);
  });

  updateSelectAllState(list);
}

function updateSelectAllState(list) {
  const selectAll = document.getElementById('selectAll');
  if (!selectAll) return;
  if (list.length === 0) {
    selectAll.checked = false;
    return;
  }
  const allChecked = list.every(item => selectedIds.has(item.id));
  selectAll.checked = allChecked;
}

function handleSort(col) {
  if (sortColumn === col) {
    sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    sortColumn = col;
    sortDirection = 'asc';
  }
  updateSortIndicators();
  renderTable();
}

function updateSortIndicators() {
  const headers = document.querySelectorAll('th[data-sort]');
  headers.forEach(th => {
    const col = th.getAttribute('data-sort');
    const span = th.querySelector('.sort-icon');
    if (span) {
      if (col === sortColumn) {
        span.textContent = sortDirection === 'asc' ? ' ▲' : ' ▼';
        th.classList.add('active-sort');
      } else {
        span.textContent = ' ⇅';
        th.classList.remove('active-sort');
      }
    }
  });
}

// Google Sheets 동기화 시뮬레이션 및 실제 fetch
async function refreshFromGoogleSheet() {
  const syncStatus = document.getElementById('syncStatus');
  const refreshBtn = document.getElementById('refreshBtn');

  if (refreshBtn) refreshBtn.disabled = true;
  if (syncStatus) syncStatus.textContent = 'Google Sheets에서 최신 데이터 수신 중...';

  if (sheetApiUrl && sheetApiUrl.trim().startsWith('http')) {
    try {
      const resp = await fetch(sheetApiUrl);
      if (!resp.ok) throw new Error('네트워크 응답 오류: ' + resp.status);
      const rows = await resp.json();
      // Apps Script doGet 표준 데이터 계약 파싱: { 이름, 소속, 직함, 이메일, 연락처, 신청일, 상태 }
      if (Array.isArray(rows) && rows.length > 0) {
        participants = rows.map((r, i) => ({
          id: i + 1,
          name: r['이름'] || '',
          org: r['소속'] || '',
          role: r['직함'] || '',
          email: r['이메일'] || '',
          phone: r['연락처'] || '',
          date: r['신청일'] || '',
          status: r['상태'] || '신청'
        }));
        const now = new Date();
        const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
        if (syncStatus) syncStatus.textContent = `시트와 동기화 완료 · 마지막 동기화 오늘 ${timeStr}`;
        renderAll();
        alert(`Google Sheet 연동 완료: 총 ${participants.length}명의 데이터를 새로 불러왔습니다.`);
        if (refreshBtn) refreshBtn.disabled = false;
        return;
      }
    } catch (err) {
      console.warn('Apps Script fetch 실패:', err);
      alert('Google Sheets 웹앱 연결 실패 (CORS 또는 URL 확인 필요). 로컬 샘플 데이터로 복귀합니다.');
    }
  }

  // URL 미설정 시 로컬 샘플 데이터 확인
  setTimeout(() => {
    if (syncStatus) syncStatus.textContent = '로컬 샘플 데이터 · Apps Script URL을 설정하면 실제 시트를 읽습니다';
    renderAll();
    if (refreshBtn) refreshBtn.disabled = false;
    alert('현재는 로컬 샘플 데이터입니다. 실제 새로고침을 하려면 Apps Script 웹앱 URL을 먼저 설정하세요.');
  }, 400);
}

// 브라우저 이벤트 바인딩
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    initApp();
    updateSortIndicators();

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', e => {
        searchQuery = e.target.value;
        renderTable();
      });
    }

    const filterChips = document.querySelectorAll('.filter-chip');
    filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentFilter = chip.getAttribute('data-filter');
        renderTable();
      });
    });

    const sortHeaders = document.querySelectorAll('th[data-sort]');
    sortHeaders.forEach(th => {
      th.addEventListener('click', () => {
        const col = th.getAttribute('data-sort');
        handleSort(col);
      });
    });

    const selectAll = document.getElementById('selectAll');
    if (selectAll) {
      selectAll.addEventListener('change', e => {
        const list = getFilteredAndSortedList();
        if (e.target.checked) {
          list.forEach(p => selectedIds.add(p.id));
        } else {
          list.forEach(p => selectedIds.delete(p.id));
        }
        renderTable();
      });
    }

    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', refreshFromGoogleSheet);
    }

    const mailBtn = document.getElementById('mailBtn');
    if (mailBtn) {
      mailBtn.addEventListener('click', () => {
        if (selectedIds.size === 0) {
          alert('안내 메일을 보낼 참가자를 1명 이상 선택해주세요.');
          return;
        }
        const selectedPersons = participants.filter(p => selectedIds.has(p.id));
        const names = selectedPersons.map(p => p.name).join(', ');
        alert(`[안내 메일 발송 시뮬레이션]\n\n선택 인원 (${selectedPersons.length}명): ${names}\n안내장 및 세미나 접속 링크가 발송 대기열에 등록되었습니다.`);
      });
    }

    const configUrlBtn = document.getElementById('configUrlBtn');
    if (configUrlBtn) {
      configUrlBtn.addEventListener('click', () => {
        const input = prompt('Apps Script 웹앱 배포 URL(/exec)을 입력하세요:', sheetApiUrl);
        if (input !== null) {
          sheetApiUrl = input.trim();
          if (sheetApiUrl) {
            alert('웹앱 주소가 설정되었습니다. [시트에서 새로고침] 버튼을 눌러 연동을 테스트하세요.');
          }
        }
      });
    }
  });
}
