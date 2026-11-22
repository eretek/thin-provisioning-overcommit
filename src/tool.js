/*! Eretek Online Araçlar #51 — Thin Provisioning ve Datastore Risk Hesabı */
ERT.def('51', {
	run: function (v, c) {
		var snap = v.snap || 0, free = v.phys - v.used - snap, over = v.prov / v.phys, unwritten = Math.max(0, v.prov - v.used);
		if (v.used + snap > v.phys) { throw c.fe('used', 'overPhys'); }
		var msgs = [];
		msgs.push(unwritten > free ? ['warn', c.t('risk', { u: c.n(unwritten, 1), f: c.n(free, 1) })] : ['ok', c.t('safe')]);
		if (free / v.phys < 0.1) { msgs.push(['err', c.t('low')]); } else if (free / v.phys < 0.2) { msgs.push(['warn', c.t('mid')]); }
		msgs.push(['info', c.t('snapNote')]);
		return { big: c.t('big', { f: c.n(free, 1), o: c.n(over * 100, 0) }), kv: [[c.t('free'), c.n(free, 2) + ' TB (' + c.pct(free / v.phys) + ')'], [c.t('over'), c.pct(over, 0)], [c.t('unw'), c.n(unwritten, 2) + ' TB'], [c.t('snap'), c.n(snap, 2) + ' TB']], msgs: msgs, v: { free: Math.round(free * 1000) / 1000, overPct: Math.round(over * 10000) / 100 } };
	}
});
