<script lang="ts">
	import CreditListMember from './CreditListMember.svelte';
	import type { CreditGroup } from '$lib/types/types';

    export let credits: CreditGroup[] = [];

	/* 
        Programatically split the credit group for every x Line
    */
    // Parameters for line counts
    // - GroupHeaderLine / GroupMemberLine = Value of how many line for header or member, split in case Header weighs bigger than the members
    // - LineCountMax = Maximum line count for credits. This is soft limit, so groups with 10 or 11 lines may exist
    // - LineCountHardMax = Hard limit for credits lines. If exceeding this, the new credit group will be split to the next one
	const groupHeaderLine = 1;
	const groupMemberLine = 1;
	const lineCountMax = 10;
	const lineCountHardMax = 12;

	// Count current lines and storage for the split credit groups
	let lineCounter = 0;
	let groupedCredit = [];
	let tempCreditArray = [];

	for (let index = 0; index < credits.length; index++) {
		let currentGroupLineCount =
			credits[index].member.length * groupMemberLine + groupHeaderLine;
		lineCounter += currentGroupLineCount;

		// If lines get too long, get the new one to next group
		if (lineCounter >= lineCountHardMax) {
			groupedCredit.push(tempCreditArray);
			lineCounter = currentGroupLineCount; // Don't reset to zero since this new credit group is already in a new split
			tempCreditArray = [];
		}

		// Push group to the temp array
		tempCreditArray.push(credits[index]);

		// Split group if threshold reached
		if (lineCounter >= lineCountMax) {
			groupedCredit.push(tempCreditArray);
			lineCounter = 0;
			tempCreditArray = [];
		}
	}

	// Push whatever left in the array
	if (tempCreditArray.length != 0) groupedCredit.push(tempCreditArray);
</script>

<div class=" flex justify-center py-16 m-0">
	<div class="flex flex-wrap justify-center w-3/4">
		{#each groupedCredit as creditData, groupIndex}
			<div class="justify-center w-1/5 pb-6 text-white">
				{#each creditData as data, i}
					<CreditListMember {data} />
				{/each}
			</div>
		{/each}
	</div>
</div>