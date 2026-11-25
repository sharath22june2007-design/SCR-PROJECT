export function matchSchemes(schemes, profile) {
  const { age, occupation, state, income, category } = profile;
  return schemes
    .filter(
      (s) => category === 'all' || s.category.toLowerCase() === category.toLowerCase()
    )
    .map((s) => {
      const reasons = [],
        checks = [];
      const e = s.eligibility;
      if (e.minAge != null && age < e.minAge)
        checks.push(`Age is below the listed minimum of ${e.minAge}.`);
      else if (e.maxAge != null && age > e.maxAge)
        checks.push(`Age is above the listed maximum of ${e.maxAge}.`);
      else if (e.minAge != null || e.maxAge != null)
        reasons.push('Age is within the listed range.');
      if (e.occupations?.length) {
        if (e.occupations.includes(occupation))
          reasons.push('Occupation matches a listed worker group.');
        else
          checks.push('Occupation is not in the worker groups listed for this scheme.');
      }
      if (s.state !== 'All India' && state !== s.state)
        checks.push(`This scheme is listed for ${s.state}.`);
      else if (s.state !== 'All India') reasons.push('Selected state matches.');
      if (e.incomeLimit != null) {
        if (income == null)
          checks.push(
            `Confirm monthly income is no more than ₹${e.incomeLimit.toLocaleString('en-IN')}.`
          );
        else if (income > e.incomeLimit)
          checks.push(
            `Monthly income exceeds the listed limit of ₹${e.incomeLimit.toLocaleString('en-IN')}.`
          );
        else reasons.push('Monthly income is within the listed limit.');
      }
      if (e.otherConditions?.length)
        checks.push(
          ...e.otherConditions.map((condition) => `Confirm this condition: ${condition}`)
        );
      const status = checks.length
        ? reasons.length
          ? 'Some Conditions Need Verification'
          : 'Not Matching Known Criteria'
        : 'Potentially Eligible';
      return { scheme: s, status, reasons, checks };
    });
}
